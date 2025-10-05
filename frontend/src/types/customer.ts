export interface Customer {
  id: number;
  orgnr: number;
  name: string;
}

export interface CreateCustomerRequest {
  name: string;
  orgnr: number;
}
