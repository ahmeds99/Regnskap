import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';

const router = Router();

// GET total costs per project
router.get('/project/:projectId', async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    const { data, error } = await supabase
      .from('expenses')
      .select('amount')
      .eq('project_id', projectId);

    if (error) throw error;

    const totalCost = data.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

    res.json({
      project_id: parseInt(projectId),
      total_cost: totalCost,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate project costs' });
  }
});

// GET total costs per customer (all their projects combined)
router.get('/customer/:customerId', async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;

    // Get all projects for this customer
    const { data: customerProjects, error: cpError } = await supabase
      .from('customer_projects')
      .select('project_id')
      .eq('customer_id', customerId);

    if (cpError) throw cpError;

    if (!customerProjects || customerProjects.length === 0) {
      return res.json({
        customer_id: parseInt(customerId),
        total_cost: 0,
        projects: [],
      });
    }

    const projectIds = customerProjects.map(cp => cp.project_id);

    // Get all expenses for these projects
    const { data: expenses, error: expError } = await supabase
      .from('expenses')
      .select('project_id, amount')
      .in('project_id', projectIds);

    if (expError) throw expError;

    // Calculate total per project
    const projectCosts = projectIds.map(projectId => {
      const projectExpenses = expenses?.filter(e => e.project_id === projectId) || [];
      const projectTotal = projectExpenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);

      return {
        project_id: projectId,
        total_cost: projectTotal,
      };
    });

    const totalCustomerCost = projectCosts.reduce((sum, pc) => sum + pc.total_cost, 0);

    res.json({
      customer_id: parseInt(customerId),
      total_cost: totalCustomerCost,
      projects: projectCosts,
    });
  } catch (error) {
    console.error('Cost calculation error:', error);
    res.status(500).json({ error: 'Failed to calculate customer costs' });
  }
});

// GET costs overview for all customers
router.get('/customers', async (_req: Request, res: Response) => {
  try {
    // Get all customers
    const { data: customers, error: custError } = await supabase
      .from('customers')
      .select('id, name, orgnr')
      .order('id', { ascending: true });

    if (custError) throw custError;

    // Get all customer-project associations with project names
    const { data: customerProjects, error: cpError } = await supabase
      .from('customer_projects')
      .select('customer_id, project_id, projects(name)');

    if (cpError) throw cpError;

    // Get all expenses
    const { data: expenses, error: expError } = await supabase
      .from('expenses')
      .select('project_id, amount');

    if (expError) throw expError;

    // Calculate costs for each customer
    const customersWithCosts = customers?.map(customer => {
      const customerProjectLinks =
        customerProjects?.filter(cp => cp.customer_id === customer.id) || [];

      const projectCosts = customerProjectLinks.map((cp: any) => {
        const projectExpenses = expenses?.filter(e => e.project_id === cp.project_id) || [];
        const projectTotal = projectExpenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);

        return {
          project_id: cp.project_id,
          project_name: cp.projects?.name || 'Unknown',
          total_cost: projectTotal,
        };
      });

      const totalCost = projectCosts.reduce((sum, pc) => sum + pc.total_cost, 0);

      return {
        ...customer,
        total_cost: totalCost,
        project_count: customerProjectLinks.length,
        projects: projectCosts,
      };
    });

    res.json(customersWithCosts);
  } catch (error) {
    console.error('Costs overview error:', error);
    res.status(500).json({ error: 'Failed to calculate costs overview' });
  }
});

export default router;
