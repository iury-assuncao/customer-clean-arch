import { CustomerRepositoryInterface } from '../domain/repository/customer.repository';
import { CustomerProps } from '../domain/types/customerInput';

export class UpdateCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}
  async execute(id: string, input: CustomerProps): Promise<void> {
    await this.customerRepository.update(id, input);
  }
}
