import path from 'path';
import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import User from '../typeorm/model/User';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import uploadConfig from '../../../config/multer/upload';
import fs from 'fs';

interface IRequest {
  avatarFileName: string;
  userId: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new BaseError('Usuario não encontrado', 404);
    }

    // juntar o nome do avatar com o caminho dele
    if (user.avatar) {
      console.log(user.avatar);

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      // remove arquivos
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await userRepository.save(user);

    return user
  }
}
export default UpdateUserAvatarService;
