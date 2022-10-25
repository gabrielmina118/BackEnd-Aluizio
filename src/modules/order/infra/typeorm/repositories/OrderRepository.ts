import { getRepository, Repository } from 'typeorm';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
import Customer from '../../../../customers/infra/typeorm/model/ICustomer';
import { IOrdersRepository } from '../../../domain/IOrdersRepository';
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

class OrderRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  findAll(): Promise<PaginationAwareObject> {
    const orders = this.ormRepository.createQueryBuilder().paginate();
    return orders;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = this.ormRepository.findOne({
      where: { id },
      relations: ['order_products', 'customer'],
    });

    return order;
  }
  public async create({ customer, products }: IRequest): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}

export default OrderRepository;
