import type {
  CustomerProject,
  CreateCustomerProjectRequest,
} from "../types/customerProject";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const customerProjectsApi = {
  getByProject: async (projectId: number): Promise<CustomerProject[]> => {
    const res = await fetch(
      `${API_BASE_URL}/customer-projects/project/${projectId}`
    );
    if (!res.ok) throw new Error("Failed to fetch customer-project associations");
    return res.json();
  },

  getByCustomer: async (customerId: number): Promise<CustomerProject[]> => {
    const res = await fetch(
      `${API_BASE_URL}/customer-projects/customer/${customerId}`
    );
    if (!res.ok) throw new Error("Failed to fetch customer-project associations");
    return res.json();
  },

  create: async (
    data: CreateCustomerProjectRequest
  ): Promise<CustomerProject> => {
    const res = await fetch(`${API_BASE_URL}/customer-projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create customer-project association");
    return res.json();
  },

  deleteByIds: async (customerId: number, projectId: number): Promise<void> => {
    const res = await fetch(
      `${API_BASE_URL}/customer-projects/customer/${customerId}/project/${projectId}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) throw new Error("Failed to delete customer-project association");
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/customer-projects/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete customer-project association");
  },

  deleteByProject: async (projectId: number): Promise<void> => {
    const res = await fetch(
      `${API_BASE_URL}/customer-projects/project/${projectId}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok)
      throw new Error("Failed to delete customer-project associations");
  },
};
