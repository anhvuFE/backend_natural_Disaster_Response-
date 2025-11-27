import { Router } from 'express';
import disasterRoutes from './disaster.routes';
import incidentRoutes from './incident.routes';
import responderRoutes from './responder.routes';
import locationRoutes from './location.routes';
import authRoutes from './auth.routes';
import { authGuard } from '../middleware/auth';

const router = Router();

router.use('/auth', authRoutes);

// Mọi route bên dưới yêu cầu Bearer token
router.use(authGuard);
router.use('/disasters', disasterRoutes);
router.use('/incidents', incidentRoutes);
router.use('/responders', responderRoutes);
router.use('/locations', locationRoutes);

export default router;
