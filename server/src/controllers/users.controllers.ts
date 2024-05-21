import { Request, Response } from 'express';
import { User } from '../models/users.models';

export const UserController = {
  registerPublisher: async (req: Request, res: Response) => {
    try {
      let { name, username, password } = req.body;
      const user = new User({ name, username, password });
      await user.save();
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
};
