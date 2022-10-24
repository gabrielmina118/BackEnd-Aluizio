import { Request, Response } from 'express';
import CreateProductService from '../../../services/CreateProductService';
import DeleteProductService from '../../../services/DeleteProductService';
import ListProductsServices from '../../../services/ListProductsServices';
import ShowProductByIdService from '../../../services/ShowProductByIdService';
import UpdateProductService from '../../../services/UpdateProductService';

export default class ProductsController {
  public async list(req: Request, res: Response): Promise<Response> {

    const products = await new ListProductsServices().execute();

    return res.status(200).json(products);
  }

  public async showById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const productById = await new ShowProductByIdService().execute({ id });

    return res.json(productById);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;

    const creteProductService = new CreateProductService()

    const productById = await creteProductService.execute({
      name,
      price,
      quantity,
    });

    return res.json(productById);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const { id } = req.params;

    const updateProduct = await new UpdateProductService().execute({
      id,
      name,
      price,
      quantity,
    });

    return res.json(updateProduct);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await new DeleteProductService().execute({ id });

    return res.send({message:`produto com ${id} deletado com sucesso`})
  }
}
