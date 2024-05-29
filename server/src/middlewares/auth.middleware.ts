import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';

import { User } from '../models/users.models';

import { PublicPaths, ValidPaths } from '../constants/constants';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (PublicPaths.includes(req.path)) {
      return next();
    }
    if (!ValidPaths.includes(req.path)) {
      return next();
    }
    const authorization = req.headers.authorization;
    if (!authorization) {
      res
        .status(401)
        .json({ message: 'Unauthorized: Authorization header is required', status: 401 });
      return next();
    } else {
      const [type, credentials] = authorization.split(' ');

      const decodedCredentials = Buffer.from(credentials, 'base64').toString('utf8');
      const [username, password] = decodedCredentials.split(':');
      const user = await User.findOne({ username });
      if (!user) {
        res.status(401).json({ message: 'Unauthorized: Invalid user', status: 401 });
        return next();
      } else {
        if (user.password !== password) {
          res.status(401).json({ message: 'Unauthorized: Invalid password', status: 401 });
          return next();
        } else {
          // a better way of doing is creating a new definition for Request
          // using "Deceleration Merging" in TypeScript
          // https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
          req.body = Object.assign({}, req.body, { usermeta: user });
          return next();
        }
      }
    }
  } catch (error) {
    return next();
  }
};
