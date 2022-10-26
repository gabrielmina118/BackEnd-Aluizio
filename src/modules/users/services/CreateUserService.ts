import BaseError from '../../../shared/errors/BaseError';
import { IUsersRepository } from '../domain/IUserRepository';
import HashManager from '../infra/http/HashManager/HashManager';
import User from '../infra/typeorm/model/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {

  constructor(private userRepository:IUsersRepository){}

  public async execute({ name, email, password }: IRequest): Promise<User> {

    const userExist = await this.userRepository.findByEmail(email);

    if (userExist) {
      throw new BaseError('Usuario ja existente', 401);
    }

    const hashPassword = await new HashManager().hash(password);

    const user = this.userRepository.create({
      name,
      email,
      password: hashPassword,
    });


    return user;
  }
}
export default CreateUserService;
