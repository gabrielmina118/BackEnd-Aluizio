import BaseError from '../../../shared/errors/BaseError';
import { ICustomerRepository } from '../domain/ICustomerRepository';
import Customer from '../infra/typeorm/model/ICustomer';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  constructor(private customerRepository: ICustomerRepository) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customerExist = await this.customerRepository.findByEmail(email);

    if (customerExist) {
      throw new BaseError('Cliente ja existente', 401);
    }

    const customer = await this.customerRepository.create({
      name,
      email,
    });

    return customer;
  }
}

export default CreateCustomerService;
