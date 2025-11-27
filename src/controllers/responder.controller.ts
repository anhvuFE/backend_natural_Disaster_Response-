import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ResponderModel } from '../models/responder.model';
import { parseBody } from '../utils/validation';

const locationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  address: z.string().optional(),
});

const createResponderSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  contactPhone: z.string().min(5),
  skills: z.array(z.string()).optional(),
  status: z.enum(['available', 'assigned', 'offline']).optional(),
  currentLocation: locationSchema,
});

const updateResponderSchema = createResponderSchema.partial();

export const listResponders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status } = req.query;
    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    const responders = await ResponderModel.find(query).sort({ createdAt: -1 });
    res.json(responders);
  } catch (error) {
    next(error);
  }
};

export const createResponder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = parseBody(createResponderSchema, req.body);
    const created = await ResponderModel.create({ ...payload, skills: payload.skills || [] });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const updateResponder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = parseBody(updateResponderSchema, req.body);
    const updated = await ResponderModel.findByIdAndUpdate(req.params.id, payload, { new: true });
    if (!updated) {
      res.status(404).json({ message: 'Responder not found' });
      return;
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const getResponder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const responder = await ResponderModel.findById(req.params.id);
    if (!responder) {
      res.status(404).json({ message: 'Responder not found' });
      return;
    }
    res.json(responder);
  } catch (error) {
    next(error);
  }
};

export const deleteResponder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await ResponderModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'Responder not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
