import { ICustomer } from "../../customers/domain/ICustomer";
import { ICreateOrderProducts } from "./IOrder";

export interface ICreateOrder {
  customer: ICustomer;
  products: ICreateOrderProducts[];
}
