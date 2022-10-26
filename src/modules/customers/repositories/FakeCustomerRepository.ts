import Customer from '../infra/typeorm/model/ICustomer';
import { v4 } from 'uuid';
import { ICustomerRepository } from '../domain/ICustomerRepository';

interface ICreateCostumer {
  name: string;
  email: string;
}

class FakeCustomerRepository implements ICustomerRepository {
  private customers: Customer[] = [];

  public async create({ name, email }: ICreateCostumer): Promise<Customer> {
    const customer = new Customer();
    customer.id = v4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    Object.assign(this.customers, customer);

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer;
  }

  public async findAll(): Promise<Customer[] | undefined> {
    return undefined;
  }

  public async remove(customer: Customer): Promise<void> {}
}

export default FakeCustomerRepository;
