import type {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
} from "../types/project";

const API_BASE_URL = "http://localhost:3000/api";

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const res = await fetch(`${API_BASE_URL}/projects`);
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
  },

  getById: async (id: number): Promise<Project> => {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`);
    if (!res.ok) throw new Error("Failed to fetch project");
    return res.json();
  },

  create: async (project: CreateProjectRequest): Promise<Project> => {
    const res = await fetch(`${API_BASE_URL}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (!res.ok) throw new Error("Failed to create project");
    return res.json();
  },

  update: async (
    id: number,
    project: UpdateProjectRequest
  ): Promise<Project> => {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (!res.ok) throw new Error("Failed to update project");
    return res.json();
  },
};
