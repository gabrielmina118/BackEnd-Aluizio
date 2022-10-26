import { Request, Response } from 'express';
import ResetPasswordService from '../../../services/ResetPasswordService';
import { UserRepository } from '../../typeorm/repositories/UserRepository';
import { UsersTokensRepository } from '../../typeorm/repositories/UsersTokensRepository';

class ResetPasswordController {
  public create = async (req: Request, res: Response): Promise<Response> => {
    const { token, password } = req.body;

    const resetpasswordControler = new ResetPasswordService(
      new UserRepository(),
      new UsersTokensRepository(),
    );

    await resetpasswordControler.execute({ token, password });

    return res.status(204).json();
  };
}

export default ResetPasswordController;
