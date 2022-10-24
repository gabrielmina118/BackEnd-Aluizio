import { Request, Response } from 'express';
import CreateUserService from '../../../services/CreateUserService';
import ListUsersServices from '../../../services/ListUsersServices';

interface IReponse {
  id: string;
  name: string;
  email: string;
  avatar: null | string;
  created_at: Date;
}

class UsersControllers {
  public listUsers = async (req: Request, res: Response): Promise<Response> => {
    const listUserServices = new ListUsersServices();
    const users = await listUserServices.execute();

    const userType: IReponse[] = users.map(user => {
      const type: IReponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        created_at: user.created_at,
      };
      return type;
    });

    return res.status(200).send(userType);
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return res.status(200).send(user);
  };
}

export default UsersControllers;
