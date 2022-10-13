import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import Customer from '../typeorm/model/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customerExist = await customerRepository.findByEmail(email)

    if(customerExist){
      throw new BaseError("Cliente ja existente",401)
    }

    const customer = customerRepository.create({
      name,
      email,
    })

    await customerRepository.save(customer)

    return customer
  }
}

export default CreateCustomerService;
