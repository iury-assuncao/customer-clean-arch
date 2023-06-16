import { Either, left, right } from '../domain/errors/Either';
import { RequiredParametersError } from '../domain/errors/required-parameter.error';
import { StatusCode } from '../domain/errors/status-code.enum';
import { CustomerRepositoryInterface } from '../domain/repository/customer.repository';
import { CustomerProps } from '../domain/types/customerInput';

type response = Either<RequiredParametersError, string>;

export class UpdateCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}
  async execute(id: string, input: CustomerProps): Promise<response> {
    const customer = await this.customerRepository.update(id, input);

    if (!customer) {
      return left(
        new RequiredParametersError(
          'Cliente não encontrado',
          StatusCode.Not_found,
        ),
      );
    }
    return right('Cliente atualizado com sucesso');
  }
}
