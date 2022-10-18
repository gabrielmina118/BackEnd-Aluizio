import { getCustomRepository } from 'typeorm';
import RedisCache from '../../../shared/cache/RedisCache';
import BaseError from '../../../shared/errors/BaseError';
import Product from '../typeorm/model/Product';
import { ProductRepositoy } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepositoy);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new BaseError(`Produto com id ${id} não encontrado`, 404);
    }

    // verifica se o nome inserido ja existe
    const productExists = await productRepository.findByName(name);

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

    await productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
