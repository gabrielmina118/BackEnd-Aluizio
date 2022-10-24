import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/model/User';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';



class ListUsersServices {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);

    const allUsers = await userRepository.find();

    return allUsers;
  }
}

export default ListUsersServices;
