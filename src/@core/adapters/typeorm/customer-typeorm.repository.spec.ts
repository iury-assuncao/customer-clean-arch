import { Customer, CustomerProps } from '../../domain/entities/customer.entity';
import { DataSource } from 'typeorm';
import { CustomerTypeOrmRepository } from './customer-typeorm.repository';
import { CustomerSchema } from './customer.schema';

describe('CustomerTypeOrmRepository Test', () => {
  it('should insert a new customer', async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [CustomerSchema],
    });
    await dataSource.initialize();

    const ormRepo = dataSource.getRepository(Customer);
    const repository = new CustomerTypeOrmRepository(ormRepo);
    const customerProps: CustomerProps = {
      cnpj: 'teste',
      fantasyName: 'fantasy',
      consultantsTotal: 10,
    };
    const customer = Customer.create(customerProps);
    await repository.insert(customer);
    const customerFound = await ormRepo.findOneBy({ id: customer.id });
    console.log('customerFound.toJSON()', customerFound.toJSON());
    expect(customerFound.toJSON()).toStrictEqual(customer.toJSON());
  });
});
