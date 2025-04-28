import express from 'express';
import {
  createGame,
  deleteGame,
  getGame,
  getGamesList,
  updateGame,
} from '../controllers/game.controller';

const router = express.Router();

router.post('/', createGame);

router.put('/:gameId', updateGame);

router.delete('/:gameId', deleteGame);

router.get('/list', getGamesList);

router.get('/:gameId', getGame);

export default router;
