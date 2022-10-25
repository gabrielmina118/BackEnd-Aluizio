import { getRepository, Repository } from 'typeorm';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
import { ICustomerRepository } from '../../../domain/ICustomerRepository';
import Customer from '../model/ICustomer';

interface ICreateCostumer {
  name: string;
  email: string;
}

class CustomerRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async create({ name, email }: ICreateCostumer): Promise<Customer> {

    const customer = this.ormRepository.create({ name, email });
    await this.ormRepository.save(customer)
    return customer;
  }

  public async findAll(): Promise<PaginationAwareObject> {
    const customers = this.ormRepository.createQueryBuilder().paginate();
    return customers;
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.ormRepository.save(customer);
    return customer;
  }

  public async remove(customer: Customer): Promise<void> {
    await this.ormRepository.remove(customer);
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      id,
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      email,
    });

    return customer;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      name,
    });

    return customer;
  }
}

export default CustomerRepository;
