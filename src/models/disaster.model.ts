import { Schema, model, Document } from 'mongoose';
import { Location } from './location';

type DisasterStatus = 'active' | 'monitoring' | 'resolved';

type DisasterType =
  | 'earthquake'
  | 'flood'
  | 'wildfire'
  | 'storm'
  | 'landslide'
  | 'drought'
  | 'other';

export interface DisasterDocument extends Document {
  name: string;
  type: DisasterType;
  severity: number;
  status: DisasterStatus;
  location: Location;
  startedAt: Date;
  description?: string;
  resourcesNeeded: string[];
  createdAt: Date;
  updatedAt: Date;
}

const locationSchema = new Schema<Location>(
  {
    latitude: { type: Number, required: true, min: -90, max: 90 },
    longitude: { type: Number, required: true, min: -180, max: 180 },
    address: { type: String },
  },
  { _id: false }
);

const disasterSchema = new Schema<DisasterDocument>(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, enum: ['earthquake', 'flood', 'wildfire', 'storm', 'landslide', 'drought', 'other'] },
    severity: { type: Number, required: true, min: 1, max: 5 },
    status: { type: String, required: true, enum: ['active', 'monitoring', 'resolved'], default: 'active' },
    location: { type: locationSchema, required: true },
    startedAt: { type: Date, required: true },
    description: { type: String },
    resourcesNeeded: { type: [String], default: [] },
  },
  { timestamps: true }
);

disasterSchema.index({ status: 1, type: 1 });
disasterSchema.index({ 'location.latitude': 1, 'location.longitude': 1 });
	export const DisasterModel = model<DisasterDocument>('Disaster', disasterSchema);
