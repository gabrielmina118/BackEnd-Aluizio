import { EntityRepository, Repository } from 'typeorm';
import Customer from '../model/Customer';

@EntityRepository(Customer)
class CustomerRepository extends Repository<Customer> {
  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.findOne({
      where: {
        id,
      },
    });

    return customer;
  }
  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.findOne({
      where: {
        email,
      },
    });

    return customer;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = this.findOne({
      where: {
        name,
      },
    });

    return customer;
  }
}

export default CustomerRepository;
