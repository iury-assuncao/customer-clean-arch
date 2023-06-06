import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerInMemoryRepository } from './@core/adapters/memory/customer-in-memory';
import { CreateCustomerUseCase } from './@core/useCase/create-customer.use-case';
import { CustomerRepositoryInterface } from './@core/domain/customer.repository';
import { ListAllCustomersUseCase } from './@core/useCase/list-customers.use-case';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: CustomerInMemoryRepository,
      useClass: CustomerInMemoryRepository,
    },
    {
      provide: CreateCustomerUseCase,
      useFactory: (customerRepository: CustomerRepositoryInterface) => {
        return new CreateCustomerUseCase(customerRepository);
      },
      inject: [CustomerInMemoryRepository],
    },
    {
      provide: ListAllCustomersUseCase,
      useFactory: (customerRepository: CustomerRepositoryInterface) => {
        return new ListAllCustomersUseCase(customerRepository);
      },
      inject: [CustomerInMemoryRepository],
    },
  ],
})
export class AppModule {}
