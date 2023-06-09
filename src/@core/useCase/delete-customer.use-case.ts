import { CustomerRepositoryInterface } from '../domain/repository/customer.repository';

export class DeleteCustomerUseCase {
  constructor(private readonly ormRepo: CustomerRepositoryInterface) {}

  async execute(id: string) {
    await this.ormRepo.delete(id);
  }
}
