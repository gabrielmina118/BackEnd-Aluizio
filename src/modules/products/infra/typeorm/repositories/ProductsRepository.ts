import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../model/Product';

interface IFindProducts {
  id: string;
}

// conecta com o bd
@EntityRepository(Product)
export class ProductRepositoy extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id);

    const existsProduct = await this.find({
      where: {
        id: In(productsIds),
      },
    });

    return existsProduct;
  }
}
