import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import Customer from '../typeorm/model/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}
class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new BaseError('cliente não encontrado', 404);
    }

    const customerExist = await customerRepository.findByEmail(email);

    if (customerExist && customerExist.email !== email) {
      throw new BaseError('ja existe cliente com esse email', 401);
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService
