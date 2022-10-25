import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import Customer from '../infra/typeorm/model/ICustomer';
import CustomerRepository from '../infra/typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new BaseError('Cliente não encontrado', 404);
    }

    return customer;
  }
}

export default ShowCustomerService;
