import { Schema, model, Document } from 'mongoose';
import { Location } from './location';

type ResponderStatus = 'available' | 'assigned' | 'offline';

export interface ResponderDocument extends Document {
  name: string;
  role: string;
  contactPhone: string;
  skills: string[];
  status: ResponderStatus;
  currentLocation: Location;
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

const responderSchema = new Schema<ResponderDocument>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    contactPhone: { type: String, required: true },
    skills: { type: [String], default: [] },
    status: { type: String, enum: ['available', 'assigned', 'offline'], default: 'available' },
    currentLocation: { type: locationSchema, required: true },
  },
  { timestamps: true }
);

responderSchema.index({ status: 1 });
responderSchema.index({ 'currentLocation.latitude': 1, 'currentLocation.longitude': 1 });

export const ResponderModel = model<ResponderDocument>('Responder', responderSchema);
