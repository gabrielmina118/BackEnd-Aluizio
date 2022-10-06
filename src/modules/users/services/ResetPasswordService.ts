import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import { isAfter, addHours } from 'date-fns';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { UsersTokensRepository } from '../typeorm/repositories/UsersTokensRepository';
import HashManager from '../HashManager/HashManager';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {

    const userRepository = getCustomRepository(UserRepository);

    const userTokensRepository = getCustomRepository(UsersTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new BaseError('User token não existe');
    }

    const user = await userRepository.findById(userToken.user_id);

    if (!user) {
      throw new BaseError('Usuário não existe');
    }

    // verificar se o token ja passou da validade
    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new BaseError("Token expirado. Passou 2hr")
    }

    user.password = await new HashManager().hash(password)

    await userRepository.save(user)
  }
}
export default ResetPasswordService;
