import { CustomerInMemoryRepository } from '../adapters/memory/customer-in-memory';
import { CreateCustomerUseCase } from './create-customer.use-case';

describe('teste use case', () => {
  it('create customer', async () => {
    const repository = new CustomerInMemoryRepository();
    const createUseCase = new CreateCustomerUseCase(repository);
    const output = await createUseCase.execute({
      cnpj: '54545455445 teste',
      fantasyName: 'fantasy name usecase',
      consultantsTotal: 5,
    });
    expect(repository.customers).toHaveLength(1);
    expect(output).toStrictEqual({
      cnpj: '54545455445 teste',
      fantasyName: 'fantasy name usecase',
      consultantsTotal: 5,
      id: repository.customers[0].id,
    });
  });
});
