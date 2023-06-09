import { Customer } from '../../domain/entities/customer.entity';
import { DataSource } from 'typeorm';
import { CustomerTypeOrmRepository } from './customer-typeorm.repository';
import { CustomerSchema } from './customer.schema';
import { CustomerProps } from 'src/@core/domain/types/customerInput';

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
    expect(customerFound.toJSON()).toStrictEqual(customer.toJSON());
  });
});
