import { Customer } from 'src/@core/domain/customer.entity';
import { CustomerRepositoryInterface } from 'src/@core/domain/customer.repository';
import { Repository } from 'typeorm';

export class CsutomerTypeOrmRepository implements CustomerRepositoryInterface {
  constructor(private ormRepository: Repository<Customer>) {}

  insert(customer: Customer): Promise<Customer> {
    return this.ormRepository.save(customer);
  }
  findAll(): Promise<Customer[]> {
    return this.ormRepository.find();
  }

  findById(customerId: string): Promise<Customer> {
    return this.ormRepository.findOne({
      where: {
        id: customerId,
      },
    });
  }
}
