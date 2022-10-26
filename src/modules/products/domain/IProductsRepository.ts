import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
import { IProduct } from './IProduct';

export interface ICreateProduct {
  name: string;
  price: number;
  quantity: number;
}

export interface IFindProducts {
  id: string;
}

export interface IUpdateStockProduct {
  id: string;
  quantity: number;
}

export interface IProductsRepository {
  findByName(name: string): Promise<IProduct | undefined>;
  findById(id: string): Promise<IProduct | undefined>;
  findAll(): Promise<PaginationAwareObject>;
  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  updateStock(products: IUpdateStockProduct[]): Promise<void>;
  remove(product: IProduct): Promise<void>;
}
