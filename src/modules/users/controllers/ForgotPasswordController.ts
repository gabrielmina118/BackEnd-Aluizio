import { Request, Response } from 'express';
import SendForgotPasswordService from '../services/SendForgotPasswordService';

class ForgotPasswordController {
  public create = async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;

    const sendForgotPasswordService = new SendForgotPasswordService();

    await sendForgotPasswordService.execute({
      email,
    });

    return res.status(204).json();
  };
}

export default ForgotPasswordController;
