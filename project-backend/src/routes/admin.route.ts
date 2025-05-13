import express from 'express';
import { clear, createGame, deleteGame, getUsers, updateGame } from '../controllers/admin/admin.controller';
import { requireAdminAuth } from '../middleware/authMiddleware';

const router = express.Router();
router.use(requireAdminAuth)

router.delete('db/clear', clear);

router.get('db/users', getUsers)

router.post('game/', createGame);

router.put('game/:gameId', updateGame);

router.delete('game/:gameId', deleteGame);

export default router;
