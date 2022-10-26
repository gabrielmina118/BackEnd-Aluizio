import { Request, Response } from 'express';
import SendForgotPasswordService from '../../../services/SendForgotPasswordService';
import { UserRepository } from '../../typeorm/repositories/UserRepository';
import { UsersTokensRepository } from '../../typeorm/repositories/UsersTokensRepository';

class ForgotPasswordController {
  public create = async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;

    const sendForgotPasswordService = new SendForgotPasswordService(
      new UserRepository(),
      new UsersTokensRepository(),
    );

    await sendForgotPasswordService.execute({
      email,
    });

    return res.status(204).json({ message: `Enviamos o email para ${email}` });
  };
}

export default ForgotPasswordController;
