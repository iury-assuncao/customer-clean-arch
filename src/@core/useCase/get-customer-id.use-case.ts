import { CustomerRepositoryInterface } from '../domain/customer.repository';

export class getCustomerById {
  constructor(private customerRepository: CustomerRepositoryInterface) {}
  async getById(id: string) {
    return await this.customerRepository.findById(id);
  }
}
