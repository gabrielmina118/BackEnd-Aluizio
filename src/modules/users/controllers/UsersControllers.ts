import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUsersServices from '../services/ListUsersServices';
import HashManager from '../HashManager/HashManager';

class UsersControllers {

  public listUsers = async (req: Request, res: Response): Promise<Response> => {

    const listUserServices = new ListUsersServices();
    const users = await listUserServices.execute();

    return res.status(200).send(users);
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();

    const hashPassword = await new HashManager().hash(password);

    const user = await createUserService.execute({
      name,
      email,
      password: hashPassword,
    });

    return res.status(200).send(user);
  };


}

export default UsersControllers;
