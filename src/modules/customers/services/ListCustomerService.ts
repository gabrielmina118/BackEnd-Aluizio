import { getCustomRepository } from 'typeorm';
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
  public async execute(): Promise<IPaginateCustomer> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const allCustomers = await customerRepository
      .createQueryBuilder()
      .paginate();

    return allCustomers as IPaginateCustomer;
  }
}

export default ListCustomerService;
