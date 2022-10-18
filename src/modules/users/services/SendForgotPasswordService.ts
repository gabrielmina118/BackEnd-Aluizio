import { config } from 'dotenv';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import EtherealMail from '../../../config/mail/EtherealMail';
import BaseError from '../../../shared/errors/BaseError';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { UsersTokensRepository } from '../typeorm/repositories/UsersTokensRepository';
import SesMail from '../../../config/mail/SesMail';
import mailConfig from '../../../config/mail/mail';
config();

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

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    if (mailConfig.driver === 'ses') {
      await SesMail.sendMail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: '[API VENDAS] -  Recuperação de senha',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.name,
            link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
          },
        },
      });
      return;
    }

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API VENDAS] -  Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}
export default SendForgotPasswordService;
