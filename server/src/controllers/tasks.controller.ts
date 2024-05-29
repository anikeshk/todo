import { Request, Response } from 'express';

import { Task } from '../models/tasks.models';

import { TaskStatus, ErrorCodes } from '../constants/constants';

export const TaskController = {
  createTask: async (req: Request, res: Response) => {
    try {
      const { content, usermeta } = req.body;

      if (!content) {
        return res
          .status(400)
          .json({ status: 'error', message: 'Invalid input', code: ErrorCodes.INVALID_INPUT });
      }

      const task = new Task({
        content,
        status: TaskStatus.OPEN,
        assignee: usermeta._id,
      });
      const newTask = await task.save();
      const data = {
        id: newTask._id,
        content: newTask.content,
        completed: newTask.completed,
        assignee: newTask.assignee,
        createdAt: newTask.createdAt,
      };
      res.status(200).json({ data, status: 'success' });
    } catch (error) {
      console.error(error);
    }
  },
  getTasks: async (req: Request, res: Response) => {
    try {
      const { usermeta } = req.body;

      const total = await Task.countDocuments({ assignee: usermeta._id });
      const tasks = await Task.find({ assignee: usermeta._id });

      let data = tasks.map((task) => {
        return {
          id: task._id,
          content: task.content,
          completed: task.completed,
          assignee: task.assignee,
          createdAt: task.createdAt,
        };
      });
      res.status(200).json({ data, total, status: 'success' });
    } catch (error) {
      console.error(error);
    }
  },
  updateTask: async (req: Request, res: Response) => {
    try {
      const { content, completed } = req.body;
      const { id } = req.params;

      if (!content || completed === undefined) {
        return res
          .status(400)
          .json({ status: 'error', message: 'Invalid input', code: ErrorCodes.INVALID_INPUT });
      }

      const newTask = await Task.findOneAndUpdate(
        { _id: id },
        { content, completed },
        { new: true }
      );
      if (newTask !== null) {
        const data = {
          id: newTask._id,
          content: newTask.content,
          completed: newTask.completed,
          assignee: newTask.assignee,
          createdAt: newTask.createdAt,
        };
        res.status(200).json({ data, status: 'success' });
      }
    } catch (error) {
      console.error(error);
    }
  },
  deleteTask: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await Task.deleteOne({ _id: id });
      res.status(200).json({ status: 'success' });
    } catch (error) {
      console.error(error);
    }
  },
};
