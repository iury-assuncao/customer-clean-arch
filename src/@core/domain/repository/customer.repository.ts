import { Customer } from '../entities/customer.entity';
import { CustomerProps } from '../types/customerInput';

export interface CustomerRepositoryInterface {
  insert(customer: Customer): Promise<Customer | void>;
  findAll(): Promise<Customer[]>;
  findById(id: string): Promise<Customer>;
  update(id: string, customer: CustomerProps): Promise<Customer>;
  delete(id: string): Promise<any>;
}
