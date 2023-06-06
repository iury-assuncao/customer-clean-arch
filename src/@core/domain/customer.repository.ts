import { Customer } from './customer.entity';

export interface CustomerRepositoryInterface {
  insert(customer: Customer): Promise<void | Customer>;
  findAll(): Promise<Customer[]>;
  findById(id: string): Promise<Customer>;
}
