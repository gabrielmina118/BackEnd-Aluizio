import { ICustomer } from '../../customers/domain/ICustomer';

export interface ICreateOrderProducts {
  product_id: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  id: string;
  order: number;
  customer: ICustomer;
  order_products: ICreateOrderProducts[];
  created_at: Date;
  updated_at: Date;
}
