import express from 'express';
import { getGame, getGamesList } from '../controllers/public/public.contoller';

const router = express.Router();

router.get('/game/lib', getGamesList);

router.get('/game/:gameId', getGame);

router.get('/user/:userId/profile', getUserProfile)

router.get('/user/:userId/games', getUserGames)

export default router;
