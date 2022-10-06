import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import UserToken from '../typeorm/model/UserToken';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { UsersTokensRepository } from '../typeorm/repositories/UsersTokensRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const userTokensRepository = getCustomRepository(UsersTokensRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new BaseError('Email não encontrado', 404);
    }
   
    const token = await userTokensRepository.generete(user.id);

    console.log(token);
  }
}
export default SendForgotPasswordService;
