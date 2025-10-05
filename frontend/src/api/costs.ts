import type { CustomerCostOverview } from "../types/expense";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const costsApi = {
  getAllCustomers: async (): Promise<CustomerCostOverview[]> => {
    const res = await fetch(`${API_BASE_URL}/costs/customers`);
    if (!res.ok) throw new Error("Failed to fetch customer costs");
    return res.json();
  },
};
