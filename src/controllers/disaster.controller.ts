import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { DisasterModel } from '../models/disaster.model';
import { parseBody } from '../utils/validation';

const locationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  address: z.string().optional(),
});

const createDisasterSchema = z.object({
  name: z.string().min(2),
  type: z.enum(['earthquake', 'flood', 'wildfire', 'storm', 'landslide', 'drought', 'other']),
  severity: z.number().int().min(1).max(5),
  status: z.enum(['active', 'monitoring', 'resolved']).optional(),
  location: locationSchema,
  startedAt: z.string().or(z.date()),
  description: z.string().optional(),
  resourcesNeeded: z.array(z.string()).optional(),
});

const updateDisasterSchema = createDisasterSchema.partial();

export const listDisasters = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, type } = req.query;
    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (type) query.type = type;

    const disasters = await DisasterModel.find(query).sort({ createdAt: -1 });
    res.json(disasters);
  } catch (error) {
    next(error);
  }
};

export const createDisaster = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = parseBody(createDisasterSchema, req.body);
    const created = await DisasterModel.create({
      ...payload,
      startedAt: new Date(payload.startedAt),
      resourcesNeeded: payload.resourcesNeeded || [],
    });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const getDisaster = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const disaster = await DisasterModel.findById(req.params.id);
    if (!disaster) {
      res.status(404).json({ message: 'Disaster not found' });
      return;
    }
    res.json(disaster);
  } catch (error) {
    next(error);
  }
};

export const updateDisaster = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = parseBody(updateDisasterSchema, req.body);
    const updated = await DisasterModel.findByIdAndUpdate(
      req.params.id,
      { ...payload, startedAt: payload.startedAt ? new Date(payload.startedAt) : undefined },
      { new: true }
    );
    if (!updated) {
      res.status(404).json({ message: 'Disaster not found' });
      return;
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteDisaster = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await DisasterModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'Disaster not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
