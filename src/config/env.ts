import dotenv from 'dotenv';

dotenv.config();

type Env = {
  port: number;
  mongoUri: string;
  allowedOrigins: string[];
  externalGeocodeUrl: string;
  apiKey?: string;
  jwtSecret?: string;
  jwtExpiresIn?: string;
};

const env: Env = {
  port: Number(process.env.PORT) || 4000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/disaster_response',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean),
  externalGeocodeUrl: process.env.EXTERNAL_GEOCODE_URL || 'https://nominatim.openstreetmap.org/reverse',
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};

export default env;
