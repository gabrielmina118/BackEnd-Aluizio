import { Request, Response } from "express";
import LoginService from "../../../services/LoginService";
import { UserRepository } from "../../typeorm/repositories/UserRepository";
import HashManager from "../HashManager/HashManager";

class SessionsController{

  public loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    const login = new LoginService(new HashManager(),new UserRepository());

    const user = await login.execute({
      email,
      password,
    });

    return res.status(200).send(user);
  };
}

export default SessionsController
