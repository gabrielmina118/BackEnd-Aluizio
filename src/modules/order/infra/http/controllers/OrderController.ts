import { Request, Response } from 'express';
import CreateOrderService from '../../../services/CreateOrderService';
import ShowOrderService from '../../../services/ShowOrderService';

export default class OrderController {
  public async showOrderById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showOrderbyId = new ShowOrderService();

    const orderById = await showOrderbyId.execute({ id });

    return res.status(200).json(orderById);
  }

  public async createOrder(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({ customer_id, products });

    return res.status(201).json(order);
  }
}
