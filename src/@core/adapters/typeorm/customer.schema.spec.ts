import { DataSource } from 'typeorm';
import { CustomerSchema } from './customer.schema';
import { Customer } from '../../domain/customer.entity';

describe('Customer schema', () => {
  it('create', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [CustomerSchema],
    });
    await dataSource.initialize();
    const customer = Customer.create({
      cnpj: '545454545 teste',
      fantasyName: 'fantasy',
      consultantsTotal: 10,
    });
    const customerRepository = dataSource.getRepository(Customer);
    await customerRepository.save(customer);
    console.log(await customerRepository.findOneBy({ id: customer.id }));
  });
});
