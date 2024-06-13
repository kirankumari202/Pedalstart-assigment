import express, { Request, Response } from 'express';
import { Task } from './task.model';

const app = express();
app.use(express.json());

app.get('/tasks', async (req: Request, res: Response) => {
  const tasks = await Task.find().exec();
  res.json(tasks);
});

app.post('/tasks', async (req: Request, res: Response) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

app.get('/tasks/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const task = await Task.findById(id).exec();
  if (!task) {
    res.status(404).json({ message: 'Task not found' });
  } else {
    res.json(task);
  }
});

app.put('/tasks/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const task = await Task.findByIdAndUpdate(id, req.body, { new: true }).exec();
  if (!task) {
    res.status(404).json({ message: 'Task not found' });
  } else {
    res.json(task);
  }
});

app.delete('/tasks/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  await Task.findByIdAndRemove(id).exec();
  res.json({ message: 'Task deleted successfully' });
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});