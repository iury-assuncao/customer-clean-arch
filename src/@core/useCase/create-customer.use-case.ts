import { Customer } from '../domain/customer.entity';
import { CustomerRepositoryInterface } from '../domain/customer.repository';

type CustomerPropsInput = {
  cnpj: string;
  fantasyName: string;
  consultantsTotal: number;
};

type CustomerPropsOutput = {
  cnpj: string;
  fantasyName: string;
  consultantsTotal: number;
  id: string;
};

export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}
  async create(input: CustomerPropsInput): Promise<CustomerPropsOutput> {
    const customer = Customer.create(input);
    await this.customerRepository.insert(customer);
    return customer.toJSON();
  }
}
