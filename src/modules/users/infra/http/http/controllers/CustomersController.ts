import { Request, Response } from 'express';
import CreateCustomerService from '../../../../../customers/services/CreateCustomerService';
import DeleteCustomerService from '../../../../../customers/services/DeleteCustomerService';
import ListCustomerService from '../../../../../customers/services/ListCustomerService';
import ShowCustomerService from '../../../../../customers/services/ShowCustomerService';
import UpdateCustomerService from '../../../../../customers/services/UpdateCustomerService';

class CustomersController {
  public async list(req: Request, res: Response): Promise<Response> {
    const customers = await new ListCustomerService().execute();

    return res.status(200).json(customers);
  }

  public async showById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const customerId = await new ShowCustomerService().execute({ id });

    return res.json(customerId);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const createCustomer = new CreateCustomerService();

    const customer = await createCustomer.execute({
      name,
      email,
    });

    return res.json(customer);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const { id } = req.params;

    const updateCustomer = await new UpdateCustomerService().execute({
      id,
      name,
      email,
    });

    return res.json(updateCustomer);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await new DeleteCustomerService().execute({ id });

    return res.send({ message: `cliente com id ' ${id} ' deletado com sucesso` });
  }
}

export default CustomersController;
