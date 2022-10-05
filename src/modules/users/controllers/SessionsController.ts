import { Request, Response } from "express";
import HashManager from "../HashManager/HashManager";
import LoginService from "../services/LoginService";

class SessionsController{

  public loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    const login = new LoginService(new HashManager());

    const user = await login.execute({
      email,
      password,
    });

    return res.status(200).send(user);
  };
}

export default SessionsController
