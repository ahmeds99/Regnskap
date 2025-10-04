import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';

const router = Router();

// GET all projects
router.get('/', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET single project by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// POST create new project
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, status } = req.body;
    const { data, error } = await supabase
      .from('projects')
      .insert([{ name, description, status }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// PUT update project
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;
    const { data, error } = await supabase
      .from('projects')
      .update({ name, description, status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

export default router;
