import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';

const router = Router();

// GET all customer-project associations for a specific project
router.get('/project/:projectId', async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { data, error } = await supabase
      .from('customer_projects')
      .select(`
        id,
        customer_id,
        project_id,
        percentage,
        customers (
          id,
          name,
          orgnr
        )
      `)
      .eq('project_id', projectId);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customer-project associations' });
  }
});

// GET all customer-project associations for a specific customer
router.get('/customer/:customerId', async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    const { data, error } = await supabase
      .from('customer_projects')
      .select(`
        id,
        customer_id,
        project_id,
        percentage,
        projects (
          id,
          name,
          description,
          status
        )
      `)
      .eq('customer_id', customerId);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customer-project associations' });
  }
});

// POST create customer-project association
router.post('/', async (req: Request, res: Response) => {
  try {
    const { customer_id, project_id } = req.body;
    const { data, error } = await supabase
      .from('customer_projects')
      .insert([{ customer_id, project_id }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create customer-project association' });
  }
});

// DELETE customer-project association by customer_id and project_id
router.delete('/customer/:customerId/project/:projectId', async (req: Request, res: Response) => {
  try {
    const { customerId, projectId } = req.params;
    const { error } = await supabase
      .from('customer_projects')
      .delete()
      .eq('customer_id', customerId)
      .eq('project_id', projectId);

    if (error) throw error;

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete customer-project association' });
  }
});

// DELETE customer-project association
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('customer_projects')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete customer-project association' });
  }
});

// DELETE all customer-project associations for a project
router.delete('/project/:projectId', async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { error } = await supabase
      .from('customer_projects')
      .delete()
      .eq('project_id', projectId);

    if (error) throw error;

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete customer-project associations' });
  }
});

export default router;
