import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';

const router = Router();

// GET expenses for a specific project
router.get('/project/:projectId', async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('project_id', projectId)
      .order('id', { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// POST create new expense
router.post('/', async (req: Request, res: Response) => {
  try {
    const { project_id, expense_type, amount, description } = req.body;
    const { data, error } = await supabase
      .from('expenses')
      .insert([{ project_id, expense_type, amount, description }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create expense' });
  }
});

export default router;
