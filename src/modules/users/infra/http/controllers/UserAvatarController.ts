import { Request, Response } from 'express';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';
import { UserRepository } from '../../typeorm/repositories/UserRepository';

export default class UserAvatarController {
  // : Promise<Response>
  public update = async (req: Request, res: Response) => {
    const updateUserAvatarService = new UpdateUserAvatarService(new UserRepository());

    const avatarFileName = req.file?.filename!;


    const user = await updateUserAvatarService.execute({
      userId: req.user.id,
      avatarFileName,
    });

    return res.json(user);
  };
}
