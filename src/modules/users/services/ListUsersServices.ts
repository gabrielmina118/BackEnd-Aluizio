import { getCustomRepository } from "typeorm";
import User from "../typeorm/model/User";
import { UserRepository } from "../typeorm/repositories/UserRepository";

class ListUsersServices{

  public async execute():Promise<User[]>{
    const userRepository = getCustomRepository(UserRepository)

    const allUsers = await userRepository.find()

    return allUsers
  }
}

export default ListUsersServices
