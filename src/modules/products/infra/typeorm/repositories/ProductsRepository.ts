import { getRepository, In, Repository } from 'typeorm';
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

export class ProductRepositoy {
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

  public async save(
    IProductCreate: IProductCreate,
  ): Promise<(IProductValue & Product)[]> {
    const product = await this.ormRepository.save(IProductCreate.ProductCreate);
    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne({
      where: {
        name,
      },
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
}
