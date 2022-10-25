import { Request, Response } from 'express';
import CustomerRepository from '../../../../customers/infra/typeorm/repositories/CustomerRepository';
import { ProductRepositoy } from '../../../../products/infra/typeorm/repositories/ProductsRepository';
import CreateOrderService from '../../../services/CreateOrderService';
import ShowOrderService from '../../../services/ShowOrderService';
import OrderRepository from '../../typeorm/repositories/OrderRepository';

export default class OrderController {
  public async showOrderById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showOrderbyId = new ShowOrderService(new OrderRepository());

    const orderById = await showOrderbyId.execute({ id });

    return res.status(200).json(orderById);
  }

  public async createOrder(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body;

    const createOrder = new CreateOrderService(
      new OrderRepository(),
      new CustomerRepository(),
      new ProductRepositoy(),
    );

    const order = await createOrder.execute({ customer_id, products });

    return res.status(201).json(order);
  }
}
