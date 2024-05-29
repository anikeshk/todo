import { Request, Response } from 'express';
import { Error } from 'mongoose';

import { User } from '../models/users.models';

import { ErrorCodes } from '../constants/constants';

export const UserController = {
  registerUser: async (req: Request, res: Response) => {
    try {
      let { name, username, password, email } = req.body;

      if (!name || !username || !password) {
        return res
          .status(400)
          .json({ status: 'error', message: 'Invalid input', code: ErrorCodes.INVALID_INPUT });
      }

      const checkUser = await User.findOne({ username });
      if (checkUser) {
        return res.status(400).json({
          status: 'error',
          message: 'Username already exists',
          code: ErrorCodes.USERNAME_EXISTS,
        });
      }

      const user = new User({ name, username, password, email });
      await user.save();
      return res.status(200).json({ status: 'success' });
    } catch (error) {
      return res.status(500).json({ status: 'error', code: 500, message: 'Internal Sever Error' });
    }
  },
  loginUser: async (req: Request, res: Response) => {
    try {
      let { usermeta } = req.body;
      return res.status(200).json({
        status: 'success',
        name: usermeta.name,
        email: usermeta.email,
        updatedAt: usermeta.updatedAt,
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', code: 500, message: 'Internal Sever Error' });
    }
  },
};
