export type ProjectStatus = "Pågående" | "Avsluttet" | "Planlagt";

export interface Project {
  id: number;
  name: string;
  description?: string;
  status: ProjectStatus;
  customer_projects?: Array<{
    customer_id: number;
    customers: {
      id: number;
      name: string;
      orgnr: number;
    };
  }>;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
  status: ProjectStatus;
}

export interface UpdateProjectRequest {
  name: string;
  description?: string;
  status: ProjectStatus;
}
