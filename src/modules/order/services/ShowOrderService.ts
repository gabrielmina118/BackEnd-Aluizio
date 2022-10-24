import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import Order from '../infra/typeorm/model/Order';
import OrderRepository from '../infra/typeorm/repositories/OrderRepository';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository);

    const orderCustomer = await orderRepository.findById(id);

    if (!orderCustomer) {
      throw new BaseError(
        `Não é possivel achar um pedido com esse id -> ${id}`,
        404,
      );
    }

    return orderCustomer;
  }
}

export default ShowOrderService;
