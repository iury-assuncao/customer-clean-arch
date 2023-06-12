import { CustomerProps } from 'src/@core/domain/types/customerInput';
import { Customer } from '../../domain/entities/customer.entity';
import { CustomerRepositoryInterface } from '../../domain/repository/customer.repository';

export class CustomerInMemoryRepository implements CustomerRepositoryInterface {
  update(id: string, customer: CustomerProps): Promise<void | Customer> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
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
