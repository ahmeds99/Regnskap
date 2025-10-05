export interface Expense {
  id: number;
  project_id: number;
  expense_type: string;
  amount: string;
  description?: string;
}

export interface CreateExpenseRequest {
  project_id: number;
  expense_type: string;
  amount: string;
  description?: string;
}

export interface ProjectCost {
  project_id: number;
  total_cost: number;
}

export interface ProjectCostBreakdown {
  project_id: number;
  project_name: string;
  total_cost: number;
}

export interface CustomerCostOverview {
  id: number;
  name: string;
  orgnr: number;
  total_cost: number;
  project_count: number;
  projects: ProjectCostBreakdown[];
}
