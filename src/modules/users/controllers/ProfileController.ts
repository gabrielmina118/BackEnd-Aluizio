import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

class ProfileController {
  public showProfile = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const user_id = req.user.id;
    const showProfileService = new ShowProfileService();
    const user = await showProfileService.execute({ user_id });

    return res.status(200).send(user);
  };

  public update = async (req: Request, res: Response): Promise<Response> => {

    const user_id:string = req.user.id;
    const { name, email, password, old_password } = req.body;

    const updateProfileService = new UpdateProfileService();

    const userUpdate = await updateProfileService.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return res.status(200).send(userUpdate);
  };
}

export default ProfileController;
