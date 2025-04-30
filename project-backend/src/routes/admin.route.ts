import express from 'express';
import { clear, getUsers } from '../controllers/admin/admin.controller';
import { requireAdminAuth } from '../middleware/authMiddleware';

const router = express.Router();
router.use(requireAdminAuth)

router.delete('/clear', clear);

router.get('/users', getUsers)

export default router;
