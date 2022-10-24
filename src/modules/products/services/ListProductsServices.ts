import { getCustomRepository } from 'typeorm';
import RedisCache from '../../../shared/cache/RedisCache';
import Product from '../infra/typeorm/model/Product';
import { ProductRepositoy } from '../infra/typeorm/repositories/ProductsRepository';

class ListProductsServices {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepositoy);

    let productList = await RedisCache.recover<Product[]>(
      'api-vendas-PRODUCT_LIST',
    );

    productList = await productRepository.find();
    await RedisCache.save('api-vendas-PRODUCT_LIST', productList);

    if (!productList) {
      productList = await productRepository.find();
      await RedisCache.save('api-vendas-PRODUCT_LIST', productList);
    }

    return productList;
  }
}

export default ListProductsServices;
