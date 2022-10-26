import { Request, Response } from 'express';
import CreateUserService from '../../../services/CreateUserService';
import ListUsersServices from '../../../services/ListUsersServices';
import { UserRepository } from '../../typeorm/repositories/UserRepository';

interface IReponse {
  id: string;
  name: string;
  email: string;
  avatar: null | string;
  created_at: Date;
}

class UsersControllers {
  public listUsers = async (req: Request, res: Response): Promise<Response> => {
    const listUserServices = new ListUsersServices(new UserRepository());
    const users = await listUserServices.execute();

    return res.status(200).send(users);
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService(new UserRepository());

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return res.status(200).send(user);
  };
}

export default UsersControllers;
