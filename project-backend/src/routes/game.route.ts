import express from 'express';
import {
  createGame,
  deleteGame,
  getGame,
  getGamesList,
  updateGame,
} from '../controllers/admin/game.controller';
import { requireAdminAuth } from '../middleware/authMiddleware';

const router = express.Router();
router.use(requireAdminAuth)

router.post('/', createGame);

router.put('/:gameId', updateGame);

router.delete('/:gameId', deleteGame);

router.get('/list', getGamesList);

router.get('/:gameId', getGame);

export default router;
