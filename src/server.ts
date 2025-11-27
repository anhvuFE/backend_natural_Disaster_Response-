import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { connectDatabase } from './config/database';
import env from './config/env';
import apiRoutes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { swaggerSpec } from './config/swagger';
import { apiKeyGuard } from './middleware/apiKeyAuth';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions: cors.CorsOptions = {
  origin: env.allowedOrigins.length ? env.allowedOrigins : '*',
};
app.use(cors(corsOptions));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', apiKeyGuard, apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const start = async (): Promise<void> => {
  await connectDatabase();
  app.listen(env.port, () => {
    console.log(`Disaster Response API listening on port ${env.port}`);
  });
};

void start();
