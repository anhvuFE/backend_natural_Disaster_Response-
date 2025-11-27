import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { IncidentModel } from '../models/incident.model';
import { parseBody } from '../utils/validation';

const locationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  address: z.string().optional(),
});

const createIncidentSchema = z.object({
  disaster: z.string().optional(),
  reporterName: z.string().min(2),
  contact: z.string().optional(),
  location: locationSchema,
  description: z.string().min(5),
  status: z.enum(['pending', 'acknowledged', 'in_progress', 'resolved']).optional(),
});

const updateIncidentSchema = createIncidentSchema.partial();

export const listIncidents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, disaster } = req.query;
    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (disaster) query.disaster = disaster;

    const incidents = await IncidentModel.find(query).sort({ createdAt: -1 });
    res.json(incidents);
  } catch (error) {
    next(error);
  }
};

export const createIncident = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = parseBody(createIncidentSchema, req.body);
    const created = await IncidentModel.create(payload);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const updateIncident = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = parseBody(updateIncidentSchema, req.body);
    const updated = await IncidentModel.findByIdAndUpdate(req.params.id, payload, { new: true });
    if (!updated) {
      res.status(404).json({ message: 'Incident not found' });
      return;
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const getIncident = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const incident = await IncidentModel.findById(req.params.id);
    if (!incident) {
      res.status(404).json({ message: 'Incident not found' });
      return;
    }
    res.json(incident);
  } catch (error) {
    next(error);
  }
};

export const deleteIncident = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await IncidentModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'Incident not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
