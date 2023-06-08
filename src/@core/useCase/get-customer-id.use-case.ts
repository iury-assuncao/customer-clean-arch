import { CustomerRepositoryInterface } from '../domain/repository/customer.repository';

export class getCustomerById {
  constructor(private customerRepository: CustomerRepositoryInterface) {}
  async getById(id: string) {
    return await this.customerRepository.findById(id);
  }
}
