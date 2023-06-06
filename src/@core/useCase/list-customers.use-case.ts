import { Customer } from '../domain/customer.entity';
import { CustomerRepositoryInterface } from '../domain/customer.repository';

export class ListAllCustomersUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  findAll(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }
}
