import { EntityRepository, Repository } from 'typeorm';
import Product from '../model/Product';

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
}
