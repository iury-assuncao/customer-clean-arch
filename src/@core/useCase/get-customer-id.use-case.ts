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
          'Id em formato incorreto',
          StatusCode.Bad_Request,
        ),
      );
    }
    const customer = await this.customerRepository.findById(id);
    console.log(customer);
    if (customer == null) {
      return left(
        new RequiredParametersError(
          'Customer not found',
          StatusCode.Bad_Request,
        ),
      );
    }
    return right(customer);
  }
}
