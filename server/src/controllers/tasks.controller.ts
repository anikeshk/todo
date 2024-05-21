import { Request, Response } from 'express';
import { Error } from 'mongoose';

import { Task } from '../models/tasks.models';

import { TaskStatus, ErrorCodes } from '../constants/constants';

export const TaskController = {
  createTask: async (req: Request, res: Response) => {
    try {
      const { name, description, usermeta } = req.body;

      if (!name || !description) {
        return res
          .status(400)
          .json({ status: 'error', message: 'Invalid input', code: ErrorCodes.INVALID_INPUT });
      }

      const task = new Task({ name, description, status: TaskStatus.OPEN, assignee: usermeta._id });
      await task.save();
      res.status(200).json({ status: 'success' });
    } catch (error) {
      console.log(error);
    }
  },
  getTasks: async (req: Request, res: Response) => {
    try {
      const { usermeta } = req.body;
      let { status, limit, page } = req.query;
      if (!status) status = { $in: [TaskStatus.OPEN, TaskStatus.COMPLETED] };
      if (!limit) limit = '10';
      if (!page) page = '0';

      const limitInt = parseInt(limit as string);
      const pageInt = parseInt(page as string);

      const total = await Task.countDocuments({ assignee: usermeta._id, status });

      const skipValue = pageInt === 0 ? 0 : (pageInt - 1) * limitInt;

      const tasks = await Task.find({ assignee: usermeta._id, status })
        .sort({ createdAt: -1 })
        .skip(skipValue)
        .limit(limitInt);

      const pages = Math.ceil(total / limitInt);

      let data = tasks.map((task) => {
        return {
          id: task._id,
          name: task.name,
          description: task.description,
          status: task.status,
          assignee: task.assignee,
          createdAt: task.createdAt,
        };
      });

      res.status(200).json({ data, total, current: pageInt, pages, status: 'success' });
    } catch (error) {
      console.log(error);
    }
  },
  updateTask: async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;
      const { id } = req.params;

      if (!name || !description) {
        return res
          .status(400)
          .json({ status: 'error', message: 'Invalid input', code: ErrorCodes.INVALID_INPUT });
      }

      await Task.updateOne({ _id: id }, { name, description });
      res.status(200).json({ status: 'success' });
    } catch (error) {
      console.log(error);
    }
  },
  completeTask: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await Task.updateOne({ _id: id }, { status: TaskStatus.COMPLETED });
      res.status(200).json({ status: 'success' });
    } catch (error) {
      console.log(error);
    }
  },
  deleteTask: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await Task.deleteOne({ _id: id });
      res.status(200).json({ status: 'success' });
    } catch (error) {
      console.log(error);
    }
  },
};
