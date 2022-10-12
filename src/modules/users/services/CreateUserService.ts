import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import HashManager from '../HashManager/HashManager';
import User from '../typeorm/model/User';
import { UserRepository } from '../typeorm/repositories/UserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {

    const userRepository = getCustomRepository(UserRepository);

    const userExist = await userRepository.findByEmail(email);

    if (userExist) {
      throw new BaseError('Usuario ja existente', 401);
    }

    const hashPassword = await new HashManager().hash(password);

    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await userRepository.save(user);

    return user;
  }
}
export default CreateUserService;
