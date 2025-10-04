import express, { Request, Response } from 'express';
import customersRouter from './src/routes/customers';
import projectsRouter from './src/routes/projects';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

app.use('/api/customers', customersRouter);
app.use('/api/projects', projectsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
