import { Customer } from 'src/@core/domain/customer.entity';
import { EntitySchema } from 'typeorm';

export const CustomerSchema = new EntitySchema({
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
      length: 255,
    },
  },
});
