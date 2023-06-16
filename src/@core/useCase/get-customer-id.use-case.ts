import { Customer } from '../domain/entities/customer.entity';
import { Either, left, right } from '../domain/errors/Either';
import { RequiredParametersError } from '../domain/errors/required-parameter.error';
import { StatusCode } from '../domain/errors/status-code.enum';
import { CustomerRepositoryInterface } from '../domain/repository/customer.repository';

type response = Either<RequiredParametersError, Customer>;

export class GetCustomerByIdUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}
  async execute(id: string): Promise<response> {
    if (id.length != 36) {
      return left(
        new RequiredParametersError(
          'o id deve ser do tipo uuid',
          StatusCode.Bad_Request,
        ),
      );
    }
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      return left(
        new RequiredParametersError(
          'Cliente não encontrado',
          StatusCode.Not_found,
        ),
      );
    }
    return right(customer);
  }
}
