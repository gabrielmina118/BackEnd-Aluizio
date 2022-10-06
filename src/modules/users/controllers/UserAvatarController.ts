import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {
  // : Promise<Response>
  public update = async (req: Request, res: Response) => {
    const updateUserAvatarService = new UpdateUserAvatarService();

    const avatarFileName = req.file?.filename!;

    console.log(avatarFileName);


    const user = updateUserAvatarService.execute({
      userId: req.user.id,
      avatarFileName,
    });

    return res.json(user);
  };
}
