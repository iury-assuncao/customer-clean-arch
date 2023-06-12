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
    const customerExists = await this.ormRepository.findOneBy({
      id: id,
    });
    if (!customerExists) {
      throw new Error('Customer is not exist');
    }
    return await this.ormRepository.findOneBy({
      id: id,
    });
  }

  async update(id: string, customer: Customer): Promise<Customer | void> {
    const customerExists = await this.ormRepository.findOneBy({
      id: id,
    });

    if (!customerExists) {
      throw new Error('Customer is not exist');
    }
    this.ormRepository.update(
      { id: id },
      {
        cnpj: customer.cnpj,
        consultantsTotal: customer.consultantsTotal,
        fantasyName: customer.fantasyName,
      },
    );
    return;
  }
  async delete(id: string) {
    const customerExists = this.ormRepository.findOne({ where: { id } });
    console.log(customerExists);
    if (!customerExists) {
      console.log('não existe');
      return new Error('Customer is not exist');
    }
    return this.ormRepository.delete({ id });
  }
}
