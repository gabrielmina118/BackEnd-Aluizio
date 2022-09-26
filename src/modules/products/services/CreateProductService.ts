import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import { ProductRepositoy } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/model/Product';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {

  public async execute({name,price,quantity}: IRequest): Promise<Product> {

    if(!name || !price || !quantity){
      throw new BaseError("Infomações devem ser passadas",404)
    }

    // usa um repository customizado
    const productsRepository = getCustomRepository(ProductRepositoy);


    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new BaseError('Produto ja existente', 401);
    }

    // modelando os dados para inserir
    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    // insert do mysql
    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
