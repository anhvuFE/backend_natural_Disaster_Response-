import swaggerJsdoc from 'swagger-jsdoc';
import env from './env';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Disaster Response API',
      version: '1.0.0',
      description: 'Backend for natural disaster response coordination',
    },
    servers: [{ url: `http://localhost:${env.port}/api/v1` }],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Bearer token lấy từ /auth/login hoặc /auth/register',
        },
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key',
        },
      },
      schemas: {
        Location: {
          type: 'object',
          properties: {
            latitude: { type: 'number', example: 10.762622 },
            longitude: { type: 'number', example: 106.660172 },
            address: { type: 'string' },
          },
          required: ['latitude', 'longitude'],
        },
        Disaster: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            type: { type: 'string', enum: ['earthquake', 'flood', 'wildfire', 'storm', 'landslide', 'drought', 'other'] },
            severity: { type: 'integer', minimum: 1, maximum: 5 },
            status: { type: 'string', enum: ['active', 'monitoring', 'resolved'] },
            location: { $ref: '#/components/schemas/Location' },
            startedAt: { type: 'string', format: 'date-time' },
            description: { type: 'string' },
            resourcesNeeded: { type: 'array', items: { type: 'string' } },
          },
        },
        Incident: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            disaster: { type: 'string', nullable: true },
            reporterName: { type: 'string' },
            contact: { type: 'string' },
            location: { $ref: '#/components/schemas/Location' },
            description: { type: 'string' },
            status: { type: 'string', enum: ['pending', 'acknowledged', 'in_progress', 'resolved'] },
          },
        },
        Responder: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            role: { type: 'string' },
            contactPhone: { type: 'string' },
            skills: { type: 'array', items: { type: 'string' } },
            status: { type: 'string', enum: ['available', 'assigned', 'offline'] },
            currentLocation: { $ref: '#/components/schemas/Location' },
          },
        },
      },
    },
    security: [{ ApiKeyAuth: [] }, { BearerAuth: [] }],
  },
  apis: ['src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
