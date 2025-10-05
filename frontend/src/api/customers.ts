import type {
  Customer,
  CreateCustomerRequest,
  UpdateCustomerRequest,
} from "../types/customer";

const API_BASE_URL = "http://localhost:3000/api";

export const customersApi = {
  getAll: async (): Promise<Customer[]> => {
    const res = await fetch(`${API_BASE_URL}/customers`);
    if (!res.ok) throw new Error("Failed to fetch customers");
    return res.json();
  },

  getById: async (id: number): Promise<Customer> => {
    const res = await fetch(`${API_BASE_URL}/customers/${id}`);
    if (!res.ok) throw new Error("Failed to fetch customer");
    return res.json();
  },

  create: async (customer: CreateCustomerRequest): Promise<Customer> => {
    const res = await fetch(`${API_BASE_URL}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });
    if (!res.ok) throw new Error("Failed to create customer");
    return res.json();
  },

  update: async (
    id: number,
    customer: UpdateCustomerRequest
  ): Promise<Customer> => {
    const res = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });
    if (!res.ok) throw new Error("Failed to update customer");
    return res.json();
  },
};
