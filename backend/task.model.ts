import mongoose, { Model, Document } from 'mongoose';

interface TaskInterface {
  title: string;
  description: string;
  dueDate: Date;
}

const taskSchema = new mongoose.Schema<TaskInterface>({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
});

const Task: Model<TaskInterface & Document> = mongoose.model('Task', taskSchema);

export { Task };