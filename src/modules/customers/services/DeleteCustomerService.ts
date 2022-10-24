import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import CustomerRepository from '../infra/typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new BaseError('Cliente não encontrado', 404);
    }

    // remove a entidade do customer
    await customerRepository.remove(customer);
  }
}

export default DeleteCustomerService;
