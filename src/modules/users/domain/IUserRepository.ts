import { PaginationAwareObject } from "typeorm-pagination/dist/helpers/pagination";
import User from "../infra/typeorm/model/User";
import { ICreateUser } from "./ICreateUser";
import { IUser } from "./IUser";

export interface IUsersRepository {
  findAll(): Promise<PaginationAwareObject>
  findByName(name: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUser): Promise<User>;
  save(user: User): Promise<User>;
}
