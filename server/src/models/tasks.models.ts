import { Schema, model } from 'mongoose';

const TaskSchema = new Schema(
  {
    content: { type: String, required: true },
    completed: { type: Boolean, default: false },
    assignee: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Task = model('Task', TaskSchema);
