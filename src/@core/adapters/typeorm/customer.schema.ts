import { Customer } from '../../domain/entities/customer.entity';
import { EntitySchema } from 'typeorm';

export const CustomerSchema = new EntitySchema<Customer>({
  name: 'customer',
  target: Customer,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    cnpj: {
      type: String,
      length: 255,
    },
    fantasyName: {
      type: String,
      length: 255,
    },
    consultantsTotal: {
      type: Number,
    },
  },
});
