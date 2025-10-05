import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import customersRouter from './src/routes/customers';
import projectsRouter from './src/routes/projects';
import customerProjectsRouter from './src/routes/customerProjects';
import expensesRouter from './src/routes/expenses';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

if (!CORS_ORIGIN) {
  throw new Error('CORS_ORIGIN environment variable is required');
}

app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

app.use('/api/customers', customersRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/customer-projects', customerProjectsRouter);
app.use('/api/expenses', expensesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
