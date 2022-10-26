import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import { IUsersRepository } from '../domain/IUserRepository';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';

interface IRequest {
  user_id: string;
}
interface IResopnse {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

class ShowProfileService {
  constructor(private userRepository: IUsersRepository) {}
  public async execute({ user_id }: IRequest): Promise<IResopnse> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new BaseError('Usuário não encontrado', 404);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };
  }
}

export default ShowProfileService;
