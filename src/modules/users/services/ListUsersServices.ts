import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
import { IUsersRepository } from '../domain/IUserRepository';


class ListUsersServices {
  constructor(private userRepository:IUsersRepository){}

  public async execute(): Promise<PaginationAwareObject> {

    const allUsers = await this.userRepository.findAll();

    return allUsers;
  }
}

export default ListUsersServices;
