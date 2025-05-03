import express from 'express';
import {
  createGame,
  deleteGame,
  updateGame,
} from '../controllers/admin/game.controller';
import { requireAdminAuth } from '../middleware/authMiddleware';

const router = express.Router();
router.use(requireAdminAuth)

router.post('/', createGame);

router.put('/:gameId', updateGame);

router.delete('/:gameId', deleteGame);

export default router;
