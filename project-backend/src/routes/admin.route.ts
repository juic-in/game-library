import express from 'express';
import { clear, getUsers } from '../controllers/admin/admin.controller';

const router = express.Router();

router.delete('/clear', clear);

router.get('/users', getUsers)

export default router;
