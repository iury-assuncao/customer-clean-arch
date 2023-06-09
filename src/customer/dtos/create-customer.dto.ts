import { IsNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  cnpj: string;
  @IsString()
  fantasyName: string;
  @IsNumber()
  consultantsTotal: number;
}
