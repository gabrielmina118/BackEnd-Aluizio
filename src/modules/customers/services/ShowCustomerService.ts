import BaseError from '../../../shared/errors/BaseError';
import { ICustomerRepository } from '../domain/ICustomerRepository';
import Customer from '../infra/typeorm/model/ICustomer';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  constructor(private customerRepository: ICustomerRepository) {}

  public async execute({ id }: IRequest): Promise<Customer> {

    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new BaseError('Cliente não encontrado', 404);
    }

    return customer;
  }
}

export default ShowCustomerService;
