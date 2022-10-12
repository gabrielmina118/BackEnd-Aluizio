import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/model/Product';
import { ProductRepositoy } from '../typeorm/repositories/ProductsRepository';

class ListProductsServices {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepositoy);

    const productList = await productRepository.find();


    return productList;
  }
}

export default ListProductsServices;
