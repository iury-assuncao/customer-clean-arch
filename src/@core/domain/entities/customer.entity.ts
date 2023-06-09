export type CustomerProps = {
  cnpj: string;
  fantasyName: string;
  consultantsTotal: number;
};

function create_UUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    },
  );
  return uuid;
}

export class Customer {
  public readonly id: string;
  //public props: Required<CustomerProps>;
  public cnpj: string;
  public fantasyName: string;
  public consultantsTotal: number;

  private constructor(props: CustomerProps, id?: string) {
    this.id = id || create_UUID();

    if (!props) {
      //@ts-expect-error used for ORM
      this.props = {};
      return;
    }

    this.cnpj = props.cnpj;
    this.fantasyName = props.fantasyName;
    this.consultantsTotal = props.consultantsTotal;
  }

  static create(props: CustomerProps, id?: string) {
    return new Customer(props, id);
  }

  toJSON() {
    return {
      id: this.id,
      cnpj: this.cnpj,
      fantasyName: this.fantasyName,
      consultantsTotal: this.consultantsTotal,
    };
  }
}
