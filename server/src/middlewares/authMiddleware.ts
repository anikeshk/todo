import { NextFunction, Request, Response } from 'express';

export const authMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  try {
    return next();
  } catch (error) {
    return next();
  }
};
