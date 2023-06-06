import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerInMemoryRepository } from './@core/adapters/memory/customer-in-memory';
import { CreateCustomerUseCase } from './@core/useCase/create-customer.use-case';
import { CustomerRepositoryInterface } from './@core/domain/customer.repository';
import { ListAllCustomersUseCase } from './@core/useCase/list-customers.use-case';
import { CustomerTypeOrmRepository } from './@core/adapters/typeorm/customer-typeorm.repository';
import { DataSource } from 'typeorm';
import { Customer } from './@core/domain/customer.entity';
import { getDataSourceToken } from '@nestjs/typeorm';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
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
export class AppModule {}
