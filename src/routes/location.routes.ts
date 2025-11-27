import { Router } from 'express';
import { reverseGeocodeHandler } from '../controllers/location.controller';

const router = Router();

/**
 * @swagger
 * /locations/reverse-geocode:
 *   get:
 *     summary: Lấy địa chỉ từ tọa độ
 *     tags: [Locations]
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: lon
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/reverse-geocode', reverseGeocodeHandler);

export default router;
