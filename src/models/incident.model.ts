import { Schema, model, Document, Types } from 'mongoose';
import { Location } from './location';

type IncidentStatus = 'pending' | 'acknowledged' | 'in_progress' | 'resolved';

export interface IncidentDocument extends Document {
  disaster?: Types.ObjectId;
  reporterName: string;
  contact?: string;
  location: Location;
  description: string;
  status: IncidentStatus;
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

const incidentSchema = new Schema<IncidentDocument>(
  {
    disaster: { type: Schema.Types.ObjectId, ref: 'Disaster' },
    reporterName: { type: String, required: true, trim: true },
    contact: { type: String },
    location: { type: locationSchema, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'acknowledged', 'in_progress', 'resolved'], default: 'pending' },
  },
  { timestamps: true }
);

incidentSchema.index({ status: 1 });
incidentSchema.index({ disaster: 1, status: 1 });

export const IncidentModel = model<IncidentDocument>('Incident', incidentSchema);
