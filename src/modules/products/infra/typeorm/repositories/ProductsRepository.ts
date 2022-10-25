import { getRepository, In, Repository } from 'typeorm';
import Product from '../model/Product';

interface IFindProducts {
  id: string;
}

// conecta com o bd

export class ProductRepositoy {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
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
