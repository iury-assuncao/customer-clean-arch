import { DataSource } from 'typeorm';
import { Customer } from '../../domain/entities/customer.entity';
import { CustomerSchema } from './customer.schema';

describe('Customer schema', () => {
  test('create', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [CustomerSchema],
    });
    await dataSource.initialize();
    const customer = Customer.create({
      cnpj: 'teste 222',
      fantasyName: 'fantasy 222',
      consultantsTotal: 150,
    });
    const customerRepository = dataSource.getRepository(Customer);
    await customerRepository.save(customer);
    console.log(await customerRepository.findOneBy({ id: customer.id }));
  });
});
