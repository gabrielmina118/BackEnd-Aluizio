import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
import RedisCache from '../../../shared/cache/RedisCache';
import { ProductRepositoy } from '../infra/typeorm/repositories/ProductsRepository';

class ListProductsServices {
  constructor(private productsRepository: ProductRepositoy) {}

  public async execute() {
    let productList = await RedisCache.recover<PaginationAwareObject>(
      'api-vendas-PRODUCT_LIST',
    );

    productList = await this.productsRepository.findAll();
    await RedisCache.save('api-vendas-PRODUCT_LIST', productList);

    if (!productList) {
      productList = await this.productsRepository.findAll();
      await RedisCache.save('api-vendas-PRODUCT_LIST', productList);
    }

    return productList;
  }
}

export default ListProductsServices;
