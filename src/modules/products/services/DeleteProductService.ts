import { getCustomRepository } from 'typeorm';
import RedisCache from '../../../shared/cache/RedisCache';
import BaseError from '../../../shared/errors/BaseError';
import { ProductRepositoy } from '../infra/typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  constructor(private productsRepository: ProductRepositoy) {}

  public async execute({ id }: IRequest): Promise<void> {

    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new BaseError(`Produto com id '${id}' não encontrado`, 404);
    }


    await RedisCache.invalidate("api-vendas-PRODUCT_LIST")

    await this.productsRepository.remove(product);
  }
}

export default DeleteProductService;
