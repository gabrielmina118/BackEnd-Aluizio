import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import { ProductRepositoy } from '../infra/typeorm/repositories/ProductsRepository';
import Product from '../infra/typeorm/model/Product';
import RedisCache from '../../../shared/cache/RedisCache';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {

  constructor(private productsRepository: ProductRepositoy) {}
  
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {

    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new BaseError('Produto ja existente', 401);
    }

    // modelando os dados para inserir
    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
    });

    await RedisCache.invalidate('api-vendas-PRODUCT_LIST');

    // insert do mysql
    await this.productsRepository.saveProduct(product);

    return product;
  }
}

export default CreateProductService;
