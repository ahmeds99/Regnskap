import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';

const router = Router();

// GET all customers
router.get('/', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

// GET single customer by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
});

// POST create new customer
router.post('/', async (req: Request, res: Response) => {
  try {
    const { orgnr, name } = req.body;
    const { data, error } = await supabase
      .from('customers')
      .insert([{ orgnr, name }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create customer' });
  }
});

// PUT update customer
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { orgnr, name } = req.body;
    const { data, error } = await supabase
      .from('customers')
      .update({ orgnr, name })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update customer' });
  }
});

export default router;
