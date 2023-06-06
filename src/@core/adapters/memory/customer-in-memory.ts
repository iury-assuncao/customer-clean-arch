import { Customer } from '../../domain/customer.entity';
import { CustomerRepositoryInterface } from '../../domain/customer.repository';

export class CustomerInMemoryRepository implements CustomerRepositoryInterface {
  customers: Customer[] = [];
  async insert(customer: Customer): Promise<void> {
    this.customers.push(customer);
  }
  async findAll(): Promise<Customer[]> {
    return this.customers;
  }

  findById(id: string): Promise<Customer> {
    throw new Error('Method not implemented.');
  }
}