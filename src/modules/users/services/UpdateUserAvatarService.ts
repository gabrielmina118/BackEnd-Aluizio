import path from 'path';
import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import uploadConfig from '../../../config/multer/upload';
import fs from 'fs';
import DiskStorageProvider from '../../../shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '../../../shared/providers/StorageProvider/S3StorageProvider';
import User from '../infra/typeorm/model/User';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';

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

    if (uploadConfig.driver === 's3') {
      const s3Provider = new S3StorageProvider();

      if (user.avatar) {
        await s3Provider.deleteFile(user.avatar);
      }
      const fileName = await s3Provider.saveFile(avatarFileName);
      user.avatar = fileName;
    } else {
      const diskProvider = new DiskStorageProvider();
      if (user.avatar) {
        await diskProvider.deleteFile(user.avatar);
      }

      const fileName = await diskProvider.saveFile(avatarFileName);
      user.avatar = fileName;
    }

    await userRepository.save(user);

    return user;
  }
}
export default UpdateUserAvatarService;
