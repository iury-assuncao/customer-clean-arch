import { Customer } from '../domain/entities/customer.entity';
import { CustomerRepositoryInterface } from '../domain/repository/customer.repository';
import { CustomerProps } from '../domain/types/customerInput';

type CustomerPropsOutput = {
  cnpj: string;
  fantasyName: string;
  consultantsTotal: number;
  id: string;
};

export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}
  async execute(input: CustomerProps): Promise<CustomerPropsOutput> {
    const customer = Customer.create(input);
    await this.customerRepository.insert(customer);
    return customer.toJSON();
  }
}
