import { ZodSchema } from 'zod';

export const parseBody = <T>(schema: ZodSchema<T>, payload: unknown): T => {
  const result = schema.safeParse(payload);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
    const message = issues.join('; ');
    const error = new Error(message);
    (error as Error & { status?: number }).status = 400;
    throw error;
  }
  return result.data;
};
