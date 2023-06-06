import { Customer, CustomerProps } from './customer.entity';

describe('contultant Tests', () => {
  it('constructor', () => {
    const customerProps: CustomerProps = {
      cnpj: '545454545 teste',
      fantasyName: 'fantasy',
      consultantsTotal: 10,
    };
    const customer = Customer.create(customerProps);

    expect(customer.props).toStrictEqual({
      ...customerProps,
    });
  });
});
