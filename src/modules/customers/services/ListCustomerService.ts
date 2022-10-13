import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/model/Customer";
import CustomerRepository from "../typeorm/repositories/CustomerRepository";

class ListCustomerService{

  public async execute():Promise<Customer[]>{
    const customerRepository = getCustomRepository(CustomerRepository)
    const allCustomers = await customerRepository.find()

    return allCustomers
  }
}

export default ListCustomerService
