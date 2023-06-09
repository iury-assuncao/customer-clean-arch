import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCustomerUseCase } from 'src/@core/useCase/create-customer.use-case';
import { DeleteCustomerUseCase } from 'src/@core/useCase/delete-customer.use-case';
import { GetCustomerByIdUseCase } from 'src/@core/useCase/get-customer-id.use-case';
import { ListAllCustomersUseCase } from 'src/@core/useCase/list-customers.use-case';
import { UpdateCustomerUseCase } from 'src/@core/useCase/update-customer.use-case';
import { CreateCustomerDto } from 'src/customer/dtos/create-customer.dto';
import { ReturnCustomerDto } from 'src/customer/dtos/return-customer.dto';

function validationReturnUseCase(result: any) {
  if (result.isLeft()) {
    throw new HttpException(result.value.message, result.value.statusCode);
  }
}

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly listAllCustomerUseCase: ListAllCustomersUseCase,
    private readonly getCustomerByIdUseCase: GetCustomerByIdUseCase,
    private readonly deleteCustomerUseCase: DeleteCustomerUseCase,
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
  ) {}
  @UsePipes(ValidationPipe)
  @Post()
  createCustomer(
    @Body() custumerInput: CreateCustomerDto,
  ): Promise<ReturnCustomerDto> {
    return this.createCustomerUseCase.execute(custumerInput);
  }

  @Get()
  async findAll() {
    const result = await this.listAllCustomerUseCase.execute();
    validationReturnUseCase(result);
    return result.value;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.getCustomerByIdUseCase.execute(id);
    validationReturnUseCase(result);
    return result.value;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() customerUpdate: CreateCustomerDto,
  ) {
    const result = await this.updateCustomerUseCase.execute(id, customerUpdate);
    validationReturnUseCase(result);
    return result.value;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.deleteCustomerUseCase.execute(id);
    validationReturnUseCase(result);

    return result.value;
  }
}
