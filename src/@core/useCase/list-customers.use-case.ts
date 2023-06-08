import { Customer } from '../domain/entities/customer.entity';
import { CustomerRepositoryInterface } from '../domain/repository/customer.repository';

export class ListAllCustomersUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  findAll(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }
}
