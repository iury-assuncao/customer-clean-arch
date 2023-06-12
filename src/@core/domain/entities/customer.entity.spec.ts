import { CustomerProps } from '../types/customerInput';
import { Customer } from './customer.entity';

describe('contultant Tests', () => {
  it('constructor', () => {
    const customerProps: CustomerProps = {
      cnpj: '545454545 teste',
      fantasyName: 'fantasy',
      consultantsTotal: 10,
    };
    const customer = Customer.create(customerProps);

    expect(customer.cnpj).toStrictEqual(customerProps.cnpj);
    expect(customer.fantasyName).toStrictEqual(customerProps.fantasyName);
    expect(customer.consultantsTotal).toStrictEqual(
      customerProps.consultantsTotal,
    );

    expect(customer.id).toHaveLength(36);
  });
});
