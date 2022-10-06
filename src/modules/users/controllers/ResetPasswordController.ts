import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPasswordService';

class ResetPasswordController {
  public create = async (req: Request, res: Response): Promise<Response> => {
    const { token , password } = req.body;

    const resetpasswordControler = new ResetPasswordService();

    await resetpasswordControler.execute({token,password})

    return res.status(204).json();
  };
}

export default ResetPasswordController;
