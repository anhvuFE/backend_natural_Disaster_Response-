import { Router } from 'express';
import {
  listResponders,
  createResponder,
  updateResponder,
  getResponder,
  deleteResponder,
} from '../controllers/responder.controller';

const router = Router();

/**
 * @swagger
 * /responders:
 *   get:
 *     summary: Danh sách lực lượng ứng cứu
 *     tags: [Responders]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *   post:
 *     summary: Tạo mới lực lượng ứng cứu
 *     tags: [Responders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Responder'
 *     responses:
 *       201:
 *         description: Created
 */
router.get('/', listResponders);
router.post('/', createResponder);
/**
 * @swagger
 * /responders/{id}:
 *   get:
 *     summary: Chi tiết lực lượng ứng cứu
 *     tags: [Responders]
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
 *     summary: Cập nhật lực lượng ứng cứu
 *     tags: [Responders]
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
 *             $ref: '#/components/schemas/Responder'
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     summary: Xóa lực lượng ứng cứu
 *     tags: [Responders]
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
router.get('/:id', getResponder);
router.patch('/:id', updateResponder);
router.delete('/:id', deleteResponder);

export default router;
