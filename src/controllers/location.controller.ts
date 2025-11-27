import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { reverseGeocode } from '../services/geocoding.service';
import { parseBody } from '../utils/validation';

const querySchema = z.object({
  lat: z.string(),
  lon: z.string(),
});

export const reverseGeocodeHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { lat, lon } = parseBody(querySchema, req.query);
    const latitude = Number(lat);
    const longitude = Number(lon);
    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      res.status(400).json({ message: 'lat and lon must be numeric' });
      return;
    }
    const location = await reverseGeocode(latitude, longitude);
    res.json(location);
  } catch (error) {
    next(error);
  }
};
