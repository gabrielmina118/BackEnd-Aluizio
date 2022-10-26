import { getCustomRepository } from 'typeorm';
import RedisCache from '../../../shared/cache/RedisCache';
import BaseError from '../../../shared/errors/BaseError';
import Product from '../infra/typeorm/model/Product';
import { ProductRepositoy } from '../infra/typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  constructor(private productsRepository: ProductRepositoy) {}
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new BaseError(`Produto com id ${id} não encontrado`, 404);
    }

    // verifica se o nome inserido ja existe
    const productExists = await this.productsRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new BaseError(
        `Produto com o nome ${name} ja existente na aplicação`,
        401,
      );
    }

    await RedisCache.invalidate('api-vendas-PRODUCT_LIST');

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
