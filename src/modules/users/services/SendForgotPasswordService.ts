import { getCustomRepository } from 'typeorm';
import EtherealMail from '../../../config/mail/EtherealMail';
import BaseError from '../../../shared/errors/BaseError';
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

    const { token } = await userTokensRepository.generete(user.id);

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API VENDAS] -  Recuperação de senha',
      templateData: {
        template: `Olá {{name}} : {{token}}`,
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}
export default SendForgotPasswordService;
