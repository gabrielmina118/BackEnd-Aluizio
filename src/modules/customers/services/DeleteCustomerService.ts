import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import { ICustomerRepository } from '../domain/ICustomerRepository';
import CustomerRepository from '../infra/typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  constructor(private customerRepository: ICustomerRepository) {}

  public async execute({ id }: IRequest): Promise<void> {

    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new BaseError('Cliente não encontrado', 404);
    }

    // remove a entidade do customer
    await this.customerRepository.remove(customer);
  }
}

export default DeleteCustomerService;
