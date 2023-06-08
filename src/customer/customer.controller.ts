import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCustomerUseCase } from 'src/@core/useCase/create-customer.use-case';
import { GetCustomerByIdUseCase } from 'src/@core/useCase/get-customer-id.use-case';
import { ListAllCustomersUseCase } from 'src/@core/useCase/list-customers.use-case';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { ReturnCustomerDto } from 'src/customer/dto/return-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly listAllCustomerUseCase: ListAllCustomersUseCase,
    private readonly getCustomerByIdUseCase: GetCustomerByIdUseCase,
  ) {}

  @Post()
  createCustomer(
    @Body() custumerInput: CreateCustomerDto,
  ): Promise<ReturnCustomerDto> {
    return this.createCustomerUseCase.create(custumerInput);
  }

  @Get()
  findAll() {
    return this.listAllCustomerUseCase.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.getCustomerByIdUseCase.getById(id);
  }
}
