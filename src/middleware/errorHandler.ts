import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  const status = (err as { status?: number }).status || 500;
  const message = err instanceof Error ? err.message : 'Unexpected error';
  res.status(status).json({ message, status });
};

export const notFoundHandler = (_req: Request, res: Response): void => {
  res.status(404).json({ message: 'Endpoint not found' });
};
