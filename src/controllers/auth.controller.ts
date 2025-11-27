import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user.model';
import { parseBody } from '../utils/validation';
import { signToken } from '../utils/jwt';

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(8),
  role: z.enum(['admin', 'dispatcher', 'responder']).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = parseBody(registerSchema, req.body);
    const existing = await UserModel.findOne({ email: payload.email });
    if (existing) {
      res.status(409).json({ message: 'Email already registered' });
      return;
    }
    const passwordHash = await bcrypt.hash(payload.password, 10);
    const user = await UserModel.create({
      email: payload.email,
      name: payload.name,
      passwordHash,
      role: payload.role || 'dispatcher',
    });

    const userId = user._id.toString();
    const token = signToken({ sub: userId, email: user.email, role: user.role, name: user.name });
    res.status(201).json({ token, user: { id: userId, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = parseBody(loginSchema, req.body);
    const user = await UserModel.findOne({ email: payload.email });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    const valid = await bcrypt.compare(payload.password, user.passwordHash);
    if (!valid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    const userId = user._id.toString();
    const token = signToken({ sub: userId, email: user.email, role: user.role, name: user.name });
    res.json({ token, user: { id: userId, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    next(error);
  }
};

export const me = (req: Request, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  res.json({ user: req.user });
};
