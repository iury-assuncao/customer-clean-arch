export type CustomerProps = {
  cnpj: string;
  fantasyName: string;
  consultantsTotal: number;
};

export class Customer {
  public readonly id: string;
  public props: CustomerProps;

  private constructor(props: CustomerProps, id?: string) {
    this.id = id || crypto.randomUUID();

    if (!props) {
      //@ts-expect-error used for ORM
      this.props = {};
      return;
    }

    this.props = {
      ...props,
    };
  }

  static create(props: CustomerProps, id?: string) {
    return new Customer(props, id);
  }

  toJSON() {
    return {
      ...this.props,
      id: this.id,
    };
  }
}
