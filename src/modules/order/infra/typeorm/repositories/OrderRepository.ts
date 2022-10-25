import { getRepository, Repository } from 'typeorm';
import Customer from '../../../../customers/infra/typeorm/model/ICustomer';
import Order from '../model/Order';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

class OrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async save(order: Order): Promise<Order> {
    await this.ormRepository.save(order);
    return order;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = this.ormRepository.findOne(id, {
      relations: ['order_products', 'customer'],
    });
    return order;
  }
  public async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}

export default OrderRepository;
