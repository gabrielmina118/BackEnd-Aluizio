import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import CustomerRepository from '../../customers/typeorm/repositories/CustomerRepository';
import { ProductRepositoy } from '../../products/typeorm/repositories/ProductsRepository';
import Order from '../typeorm/model/Order';
import OrderRepository from '../typeorm/repositories/OrderRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository);
    const productRepository = getCustomRepository(ProductRepositoy);
    const customerRepository = getCustomRepository(CustomerRepository);

    const customerExist = await customerRepository.findById(customer_id);

    if (!customerExist) {
      throw new BaseError(
        `Não é possivel achar um cliente com esse id -> ${customer_id}`,
        404,
      );
    }

    const existProducts = await productRepository.findAllByIds(products);

    if (!existProducts.length) {
      throw new BaseError('Não é possivel achar produtos com esses id');
    }

    const existsProductsIds = existProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      checkInexistentProducts.map(product => {
        throw new BaseError(
          `Não foi possivel encontrar o produto com o ID -> ${product.id}`,
        );
      });
    }

    const quantityAvailable = products.filter(
      product =>
        existProducts.filter(prod => prod.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      quantityAvailable.map(product => {
        throw new BaseError(
          `A quantidade -> " ${product.quantity} " nao é válida para o produto com id -> " ${product.id} "`,
        );
      });
    }

    const serialProducts = products.map(prod => ({
      product_id: prod.id,
      quantity: prod.quantity,
      price: existProducts.filter(p => p.id === prod.id)[0].price,
    }));

    const order = await orderRepository.createOrder({
      customer: customerExist,
      products: serialProducts,
    });

    const { order_products } = order;

    const updatedQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existProducts.filter(p => p.id === product.id)[0].quantity -
        product.quantity,
    }));

    await productRepository.save(updatedQuantity)
    

    return order;
  }
}

export default CreateOrderService;
