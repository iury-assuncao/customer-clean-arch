import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCustomerUseCase } from './@core/useCase/create-customer.use-case';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ReturnCustomerDto } from './dto/return-customer.dto';
import { ListAllCustomersUseCase } from './@core/useCase/list-customers.use-case';

@Controller('customer')
export class AppController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly listAllCustomerUseCase: ListAllCustomersUseCase,
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
    return;
  }
}
