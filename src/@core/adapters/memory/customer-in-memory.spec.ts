import { CustomerProps } from 'src/@core/domain/types/customerInput';
import { Customer } from '../../domain/entities/customer.entity';
import { CustomerInMemoryRepository } from './customer-in-memory';

describe('Test customer in memory', () => {
  it('insert customer in array', async () => {
    const repository = new CustomerInMemoryRepository();
    const customerProps: CustomerProps = {
      cnpj: '545454545 teste',
      fantasyName: 'fantasy',
      consultantsTotal: 10,
    };
    const customer = Customer.create(customerProps);
    await repository.insert(customer);
    expect(repository.customers).toHaveLength(1);
    expect(repository.customers).toStrictEqual([customer]);
  });
});
