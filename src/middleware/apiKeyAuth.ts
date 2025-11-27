import { Request, Response, NextFunction } from 'express';
import env from '../config/env';

export const apiKeyGuard = (req: Request, res: Response, next: NextFunction): void => {
  if (!env.apiKey) {
    next();
    return;
  }

  const headerKey = req.headers['x-api-key'];
  if (headerKey !== env.apiKey) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  next();
};
