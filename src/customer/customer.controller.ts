import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCustomerUseCase } from 'src/@core/useCase/create-customer.use-case';
import { DeleteCustomerUseCase } from 'src/@core/useCase/delete-customer.use-case';
import { GetCustomerByIdUseCase } from 'src/@core/useCase/get-customer-id.use-case';
import { ListAllCustomersUseCase } from 'src/@core/useCase/list-customers.use-case';
import { CreateCustomerDto } from 'src/customer/dtos/create-customer.dto';
import { ReturnCustomerDto } from 'src/customer/dtos/return-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly listAllCustomerUseCase: ListAllCustomersUseCase,
    private readonly getCustomerByIdUseCase: GetCustomerByIdUseCase,
    private readonly deleteCustomerUseCase: DeleteCustomerUseCase,
  ) {}
  @UsePipes(ValidationPipe)
  @Post()
  createCustomer(
    @Body() custumerInput: CreateCustomerDto,
  ): Promise<ReturnCustomerDto> {
    return this.createCustomerUseCase.execute(custumerInput);
  }

  @Get()
  findAll() {
    return this.listAllCustomerUseCase.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.getCustomerByIdUseCase.getById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.deleteCustomerUseCase.execute(id);
  }
}
