import jwt from 'jsonwebtoken';
import env from '../config/env';

if (!env.jwtSecret) {
  console.warn('Warning: JWT_SECRET is not set. Authentication will not work properly.');
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  name: string;
}

export const signToken = (payload: JwtPayload): string => {
  const secret = env.jwtSecret as jwt.Secret | undefined;
  if (!secret) throw new Error('Missing JWT secret');
  const expiresIn = env.jwtExpiresIn ?? '1h';
  const options: jwt.SignOptions = { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] };
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string): JwtPayload => {
  const secret = env.jwtSecret as jwt.Secret | undefined;
  if (!secret) throw new Error('Missing JWT secret');
  return jwt.verify(token, secret) as JwtPayload;
};
