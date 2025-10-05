export interface Customer {
  id: number;
  orgnr: number;
  name: string;
  customer_projects?: Array<{
    project_id: number;
    projects: {
      id: number;
      name: string;
      description?: string;
      status: string;
    };
  }>;
}

export interface CreateCustomerRequest {
  name: string;
  orgnr: number;
}

export interface UpdateCustomerRequest {
  name: string;
}
