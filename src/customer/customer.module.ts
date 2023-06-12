import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { CustomerInMemoryRepository } from 'src/@core/adapters/memory/customer-in-memory';
import { CustomerTypeOrmRepository } from 'src/@core/adapters/typeorm/customer-typeorm.repository';
import { Customer } from 'src/@core/domain/entities/customer.entity';
import { CustomerRepositoryInterface } from 'src/@core/domain/repository/customer.repository';
import { CreateCustomerUseCase } from 'src/@core/useCase/create-customer.use-case';
import { ListAllCustomersUseCase } from 'src/@core/useCase/list-customers.use-case';
import { DataSource } from 'typeorm';
import { CustomerController } from './customer.controller';
import { CustomerSchema } from 'src/@core/adapters/typeorm/customer.schema';
import { GetCustomerByIdUseCase } from 'src/@core/useCase/get-customer-id.use-case';
import { DeleteCustomerUseCase } from 'src/@core/useCase/delete-customer.use-case';
import { UpdateCustomerUseCase } from 'src/@core/useCase/update-customer.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerSchema])],
  controllers: [CustomerController],
  providers: [
    {
      provide: CustomerTypeOrmRepository,
      useFactory: (dataSouce: DataSource) => {
        return new CustomerTypeOrmRepository(dataSouce.getRepository(Customer));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: CustomerInMemoryRepository,
      useClass: CustomerInMemoryRepository,
    },
    {
      provide: CreateCustomerUseCase,
      useFactory: (customerRepository: CustomerRepositoryInterface) => {
        return new CreateCustomerUseCase(customerRepository);
      },
      inject: [CustomerTypeOrmRepository],
    },
    {
      provide: ListAllCustomersUseCase,
      useFactory: (customerRepository: CustomerRepositoryInterface) => {
        return new ListAllCustomersUseCase(customerRepository);
      },
      inject: [CustomerTypeOrmRepository],
    },
    {
      provide: GetCustomerByIdUseCase,
      useFactory: (customerRepository: CustomerRepositoryInterface) => {
        return new GetCustomerByIdUseCase(customerRepository);
      },
      inject: [CustomerTypeOrmRepository],
    },
    {
      provide: UpdateCustomerUseCase,
      useFactory: (customerRepository: CustomerRepositoryInterface) => {
        return new UpdateCustomerUseCase(customerRepository);
      },
      inject: [CustomerTypeOrmRepository],
    },
    {
      provide: DeleteCustomerUseCase,
      useFactory: (customerRepository: CustomerRepositoryInterface) => {
        return new DeleteCustomerUseCase(customerRepository);
      },
      inject: [CustomerTypeOrmRepository],
    },
  ],
})
export class CustomerModule {}
