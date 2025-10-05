export type ProjectStatus = "Pågående" | "Avsluttet" | "Planlagt";

export interface Project {
  id: number;
  name: string;
  description?: string;
  status: ProjectStatus;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
  status: ProjectStatus;
}
