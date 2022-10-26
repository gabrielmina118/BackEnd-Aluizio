import { config } from 'dotenv';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import EtherealMail from '../../../config/mail/EtherealMail';
import BaseError from '../../../shared/errors/BaseError';
import SesMail from '../../../config/mail/SesMail';
import mailConfig from '../../../config/mail/mail';
import { IUsersRepository } from '../domain/IUserRepository';
import { IUserTokenRepository } from '../domain/IUserTokenRepository';
config();

interface IRequest {
  email: string;
}

class SendForgotPasswordService {
  constructor(
    private userRepository: IUsersRepository,
    private userTokensRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BaseError('Email não encontrado', 404);
    }

    const { token } = await this.userTokensRepository.generate(user.id);

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
