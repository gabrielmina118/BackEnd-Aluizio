import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import { isAfter, addHours } from 'date-fns';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { UsersTokensRepository } from '../infra/typeorm/repositories/UsersTokensRepository';
import HashManager from '../infra/http/HashManager/HashManager';
import { IUsersRepository } from '../domain/IUserRepository';
import { IUserTokenRepository } from '../domain/IUserTokenRepository';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  constructor(
    private userRepository: IUsersRepository,
    private userTokensRepository: IUserTokenRepository,
  ) {}
  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new BaseError('User token não existe');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new BaseError('Usuário não existe');
    }

    // verificar se o token ja passou da validade
    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new BaseError('Token expirado. Passou 2hr');
    }

    user.password = await new HashManager().hash(password);

    await this.userRepository.save(user);
  }
}
export default ResetPasswordService;
