import { getCustomRepository } from 'typeorm';
import RedisCache from '../../../shared/cache/RedisCache';
import BaseError from '../../../shared/errors/BaseError';
import { ProductRepositoy } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepositoy);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new BaseError(`Produto com id '${id}' não encontrado`, 404);
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate("api-vendas-PRODUCT_LIST")

    await productRepository.remove(product);
  }
}

export default DeleteProductService;
