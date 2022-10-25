import { getCustomRepository } from 'typeorm';
import { ICustomerRepository } from '../domain/ICustomerRepository';
import Customer from '../infra/typeorm/model/ICustomer';
import CustomerRepository from '../infra/typeorm/repositories/CustomerRepository';

interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  last_page: number;
  data: Customer[];
}

class ListCustomerService {
  constructor(private customerRepository: ICustomerRepository) {}

  public async execute(): Promise<IPaginateCustomer> {
    const allCustomers = await this.customerRepository.findAll()
    return allCustomers as IPaginateCustomer;
  }
}

export default ListCustomerService;
