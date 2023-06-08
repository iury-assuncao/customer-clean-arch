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
  ],
})
export class CustomerModule {}
