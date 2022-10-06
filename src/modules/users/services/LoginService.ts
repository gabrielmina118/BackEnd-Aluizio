import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import Authenticator from '../Authenticator/Authenticator';
import HashManager from '../HashManager/HashManager';
import User from '../typeorm/model/User';
import { UserRepository } from '../typeorm/repositories/UserRepository';

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
  constructor(private hashManager: HashManager) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    if (!email || !password) {
      throw new BaseError('Informações devem ser passadas', 404);
    }

    const userRepository = getCustomRepository(UserRepository);

    const userLogin = await userRepository.findByEmail(email);

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
