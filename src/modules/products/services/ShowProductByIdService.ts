import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import Product from '../infra/typeorm/model/Product';
import { ProductRepositoy } from '../infra/typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class ShowProductByIdService {
  constructor(private productsRepository: ProductRepositoy) {}

  public async execute({ id }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new BaseError(`Produto com id ${id} não encontrado`, 404);
    }

    return product;
  }
}

export default ShowProductByIdService;
