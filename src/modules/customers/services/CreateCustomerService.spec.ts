import BaseError from '../../../shared/errors/BaseError';
import FakeCustomerRepository from '../repositories/FakeCustomerRepository';
import CreateCustomerService from './CreateCustomerService';

describe('Create Customer', () => {
  test('Should be able to create a new customer', async () => {
    {
      const fakeCustomerRepository = new FakeCustomerRepository();
      const createCustomerService = new CreateCustomerService(
        fakeCustomerRepository,
      );
      const customer = await createCustomerService.execute({
        name: 'gabriel',
        email: 'gabriel@gmail.com',
      });

      expect(customer).toHaveProperty('id');
    }
  });

  test('Should NOT be able to create two or more customer if the same email', async () => {
    {
      const fakeCustomerRepository = new FakeCustomerRepository();
      const createCustomerService = new CreateCustomerService(
        fakeCustomerRepository,
      );
      await createCustomerService.execute({
        name: 'gabriel',
        email: 'gabriel@gmail.com',
      });

      expect(
        createCustomerService.execute({
          name: 'anderson',
          email: 'gabriel@gmail.com',
        }),
      ).rejects.toBeInstanceOf(BaseError);
    }
  });
});
