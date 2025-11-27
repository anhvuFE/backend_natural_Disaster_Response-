import { Router } from 'express';
import {
  listDisasters,
  createDisaster,
  getDisaster,
  updateDisaster,
  deleteDisaster,
} from '../controllers/disaster.controller';

const router = Router();

/**
 * @swagger
 * /disasters:
 *   get:
 *     summary: Danh sách các sự kiện thiên tai
 *     tags: [Disasters]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *   post:
 *     summary: Tạo sự kiện thiên tai mới
 *     tags: [Disasters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Disaster'
 *     responses:
 *       201:
 *         description: Created
 */
router.get('/', listDisasters);
router.post('/', createDisaster);
/**
 * @swagger
 * /disasters/{id}:
 *   get:
 *     summary: Chi tiết sự kiện thiên tai
 *     tags: [Disasters]
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
 *     summary: Cập nhật sự kiện thiên tai
 *     tags: [Disasters]
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
 *             $ref: '#/components/schemas/Disaster'
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     summary: Xóa sự kiện thiên tai
 *     tags: [Disasters]
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
router.get('/:id', getDisaster);
router.patch('/:id', updateDisaster);
router.delete('/:id', deleteDisaster);

export default router;
