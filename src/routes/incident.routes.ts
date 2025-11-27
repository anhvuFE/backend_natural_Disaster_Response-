import { Router } from 'express';
import {
  listIncidents,
  createIncident,
  updateIncident,
  getIncident,
  deleteIncident,
} from '../controllers/incident.controller';

const router = Router();

/**
 * @swagger
 * /incidents:
 *   get:
 *     summary: Danh sách báo cáo sự cố
 *     tags: [Incidents]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: disaster
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *   post:
 *     summary: Tạo báo cáo sự cố mới
 *     tags: [Incidents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Incident'
 *     responses:
 *       201:
 *         description: Created
 */
router.get('/', listIncidents);
router.post('/', createIncident);
/**
 * @swagger
 * /incidents/{id}:
 *   get:
 *     summary: Chi tiết báo cáo sự cố
 *     tags: [Incidents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *   patch:
 *     summary: Cập nhật báo cáo sự cố
 *     tags: [Incidents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Incident'
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     summary: Xóa báo cáo sự cố
 *     tags: [Incidents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 */
router.get('/:id', getIncident);
router.patch('/:id', updateIncident);
router.delete('/:id', deleteIncident);

export default router;
