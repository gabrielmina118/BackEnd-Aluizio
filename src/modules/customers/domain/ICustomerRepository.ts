import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
import Customer from '../infra/typeorm/model/ICustomer';
import { ICreateCustomer } from './ICreateCustomer';
import { ICustomer } from './ICustomer';

export interface ICustomerRepository {
  findAll(): Promise<Customer[] | undefined>;
  findByName(name: string): Promise<ICustomer | undefined>;
  findById(id: string): Promise<ICustomer | undefined>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  remove(customer: ICustomer): Promise<void>;
}
