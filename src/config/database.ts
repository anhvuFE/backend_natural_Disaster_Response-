import mongoose from 'mongoose';
import env from './env';

export const connectDatabase = async (): Promise<void> => {
  if (!env.mongoUri) {
    throw new Error('Missing MONGO_URI');
  }

  mongoose.set('strictQuery', true);
  await mongoose.connect(env.mongoUri);
};
