import { Customer } from '../entities/customer.entity';

export interface CustomerRepositoryInterface {
  insert(customer: Customer): Promise<Customer | void>;
  findAll(): Promise<Customer[]>;
  findById(id: string): Promise<Customer>;
}
