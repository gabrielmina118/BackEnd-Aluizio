import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import { IUsersRepository } from '../domain/IUserRepository';
import HashManager from '../infra/http/HashManager/HashManager';
import User from '../infra/typeorm/model/User';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';

// mudança de senha é opcional
interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {

  constructor(private userRepository: IUsersRepository) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new BaseError('Usuário não encontrado', 404);
    }

    const userUpdateEmail = await this.userRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new BaseError('Ja existe um usuario com esse email', 401);
    }

    if (password && !old_password) {
      throw new BaseError('A senha antiga deve ser passada');
    }

    // senha antiga é realmente aquela que esta no banco de dados.
    if (password && old_password) {
      const compareOldPassword: boolean =
        await new HashManager().comparePassword(old_password, user.password);

      if (!compareOldPassword) {
        throw new BaseError('A senha antiga não coincide com a passada', 401);
      }

      user.password = await new HashManager().hash(password);
    }

    user.name = name;
    user.email = email;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
