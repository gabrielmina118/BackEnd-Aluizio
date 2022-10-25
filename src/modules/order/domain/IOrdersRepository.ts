import { PaginationAwareObject } from "typeorm-pagination/dist/helpers/pagination";
import Order from "../infra/typeorm/model/Order";
import { ICreateOrder } from "./ICreateOrder";
import { IOrder } from "./IOrder";

export interface IOrdersRepository{
  findById(id: string): Promise<Order | undefined>;
  findAll(): Promise<PaginationAwareObject>
  create(data: ICreateOrder): Promise<Order>;
}
