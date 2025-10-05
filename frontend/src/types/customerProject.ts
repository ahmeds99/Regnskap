export interface CustomerProject {
  id: number;
  customer_id: number;
  project_id: number;
}

export interface CreateCustomerProjectRequest {
  customer_id: number;
  project_id: number;
}
