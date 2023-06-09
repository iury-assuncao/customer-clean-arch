import { Customer } from 'src/@core/domain/entities/customer.entity';
import { CustomerRepositoryInterface } from 'src/@core/domain/repository/customer.repository';
import { Repository } from 'typeorm';

export class CustomerTypeOrmRepository implements CustomerRepositoryInterface {
  constructor(private ormRepository: Repository<Customer>) {}

  insert(customer: Customer): Promise<Customer> {
    return this.ormRepository.save(customer);
  }
  findAll(): Promise<Customer[]> {
    return this.ormRepository.find();
  }

  findById(customerId: string): Promise<Customer> {
    return this.ormRepository.findOneBy({
      id: customerId,
    });
  }
  delete(id: string): Promise<void> {
    this.ormRepository.delete({ id });
    return;
  }
}
