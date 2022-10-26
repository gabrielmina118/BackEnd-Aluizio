import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import { IUsersRepository } from '../domain/IUserRepository';
import Authenticator from '../infra/http/Authenticator/Authenticator';
import HashManager from '../infra/http/HashManager/HashManager';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

class LoginService {
  constructor(
    private hashManager: HashManager,
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {

    const userLogin = await this.userRepository.findByEmail(email);

    if (!userLogin) {
      throw new BaseError(
        'Usuário não cadastrado , email/password incorretos',
        401,
      );
    }

    const compareHash = await this.hashManager.comparePassword(
      password,
      userLogin.password,
    );

    if (!compareHash) {
      throw new BaseError(
        'Usuário não cadastrado , email/password incorretos',
        401,
      );
    }

    const token = new Authenticator().generate({ id: userLogin.id });

    return {
      user: { id: userLogin.id, name: userLogin.name, email: userLogin.email },
      token,
    };
  }
}

export default LoginService;
