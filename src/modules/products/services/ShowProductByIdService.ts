import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import Product from '../typeorm/model/Product';
import { ProductRepositoy } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class ShowProductByIdService {
  public async execute({ id }: IRequest): Promise<Product> {

    const productRepository = getCustomRepository(ProductRepositoy);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new BaseError(`Produto com id ${id} não encontrado`, 404);
    }

    return product;
  }
}

export default ShowProductByIdService;
