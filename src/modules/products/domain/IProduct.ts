import { ICreateOrderProducts } from "../../order/domain/IOrder";

export interface IProduct {
  id: string;
  order_products?: ICreateOrderProducts[];
  name: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
