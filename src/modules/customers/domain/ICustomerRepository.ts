import { PaginationAwareObject } from "typeorm-pagination/dist/helpers/pagination";
import { ICreateCustomer } from "./ICreateCustomer";
import { ICustomer } from "./ICustomer";

export interface ICustomerRepository{
  findAll(): Promise<PaginationAwareObject>
  findByName(name: string): Promise<ICustomer | undefined>;
  findById(id: string): Promise<ICustomer | undefined>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  remove(customer: ICustomer): Promise<void>;
}

