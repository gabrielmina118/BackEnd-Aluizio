import { getRepository, In, Repository } from 'typeorm';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
import { IProduct } from '../../../domain/IProduct';
import {
  IProductsRepository,
  IUpdateStockProduct,
} from '../../../domain/IProductsRepository';
import Product from '../model/Product';

interface IFindProducts {
  id: string;
}

interface ICreateProduct {
  name: string;
  price: number;
  quantity: number;
}

export interface IProductValue {
  id: string;
  quantity: number;
}

export interface IProductCreate {
  ProductCreate: IProductValue[];
}
// conecta com o bd

export class ProductRepositoy implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create({ name, price, quantity });
    return product;
  }

  public async saveProduct(product: Product): Promise<Product> {
    await this.ormRepository.save(product);
    return product;
  }

  public async save(product: IProduct): Promise<IProduct> {
    const products = await this.ormRepository.save(product);
    return products;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne({
      name,
    });

    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id);

    const existsProduct = await this.ormRepository.find({
      where: {
        id: In(productsIds),
      },
    });

    return existsProduct;
  }

  public async findById(id: string): Promise<Product | undefined> {
    
    const product = this.ormRepository.findOne({ id });

    return product;
  }

  public async findAll(): Promise<PaginationAwareObject> {
    const products = await this.ormRepository.createQueryBuilder().paginate();

    return products;
  }

  public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    await this.ormRepository.save(products);
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }
}
