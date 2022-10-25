import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import { ICustomerRepository } from '../domain/ICustomerRepository';
import Customer from '../infra/typeorm/model/ICustomer';
import CustomerRepository from '../infra/typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}
class UpdateCustomerService {
   constructor(private customerRepository: ICustomerRepository) {}

  public async execute({ id, name, email }: IRequest): Promise<Customer> {

    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new BaseError('cliente não encontrado', 404);
    }

    const customerExist = await this.customerRepository.findByEmail(email);

    if (customerExist && customerExist.email !== email) {
      throw new BaseError('ja existe cliente com esse email', 401);
    }

    customer.name = name;
    customer.email = email;

    await this.customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService
