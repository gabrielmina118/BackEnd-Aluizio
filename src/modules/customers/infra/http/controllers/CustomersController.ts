import { Request, Response } from 'express';
import CustomerRepository from '../../typeorm/repositories/CustomerRepository';
import CreateCustomerService from '../../../services/CreateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import ListCustomerService from '../../../services/ListCustomerService';
import ShowCustomerService from '../../../services/ShowCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';

class CustomersController {
  public async list(req: Request, res: Response): Promise<Response> {
    const customers = await new ListCustomerService(
      new CustomerRepository(),
    ).execute();

    return res.status(200).json(customers);
  }

  public async showById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const customerId = await new ShowCustomerService(
      new CustomerRepository(),
    ).execute({ id });

    return res.json(customerId);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const createCustomer = new CreateCustomerService(new CustomerRepository());

    const customer = await createCustomer.execute({
      name,
      email,
    });

    return res.json(customer);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const { id } = req.params;

    const updateCustomer = await new UpdateCustomerService(
      new CustomerRepository(),
    ).execute({
      id,
      name,
      email,
    });

    return res.json(updateCustomer);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await new DeleteCustomerService(new CustomerRepository()).execute({ id });

    return res.send({
      message: `cliente com id ' ${id} ' deletado com sucesso`,
    });
  }
}

export default CustomersController;
