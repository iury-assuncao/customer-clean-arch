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

  async findById(id: string): Promise<Customer> {
    return await this.ormRepository.findOneBy({
      id: id,
    });
  }

  async update(id: string, customer: Customer): Promise<any> {
    const customerUpdate = await this.ormRepository.update(
      { id: id },
      {
        cnpj: customer.cnpj,
        consultantsTotal: customer.consultantsTotal,
        fantasyName: customer.fantasyName,
      },
    );
    return customerUpdate;
  }

  async delete(id: string) {
    return this.ormRepository.delete({ id });
  }
}
