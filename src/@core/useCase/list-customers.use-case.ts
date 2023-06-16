import { Customer } from '../domain/entities/customer.entity';
import { Either, left, right } from '../domain/errors/Either';
import { RequiredParametersError } from '../domain/errors/required-parameter.error';
import { StatusCode } from '../domain/errors/status-code.enum';
import { CustomerRepositoryInterface } from '../domain/repository/customer.repository';

type response = Either<RequiredParametersError, Customer[]>;

export class ListAllCustomersUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}
  async execute(): Promise<response> {
    const customers = await this.customerRepository.findAll();
    if (customers.length == 0) {
      return left(
        new RequiredParametersError('Nenhum cliente encontrado', StatusCode.Ok),
      );
    }
    return right(customers);
  }
}
