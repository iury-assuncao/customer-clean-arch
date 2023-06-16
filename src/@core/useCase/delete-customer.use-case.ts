import { response } from 'express';
import { Either, left, right } from '../domain/errors/Either';
import { RequiredParametersError } from '../domain/errors/required-parameter.error';
import { StatusCode } from '../domain/errors/status-code.enum';
import { CustomerRepositoryInterface } from '../domain/repository/customer.repository';

type response = Either<RequiredParametersError, string>;

export class DeleteCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface,
  ) {}

  async execute(id: string): Promise<response> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      return left(
        new RequiredParametersError(
          'Cliente não encontrado',
          StatusCode.Not_found,
        ),
      );
    }
    await this.customerRepository.delete(id);
    return right(`${id} deletado`);
  }
}
