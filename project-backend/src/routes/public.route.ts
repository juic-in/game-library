import express from 'express';
import { getGame, getGameIdentifiers, getGamesList, getUserFriends, getUserGames, getUserWishlist } from '../controllers/public/public.contoller';

const router = express.Router();

router.get('/game/lib', getGamesList);
router.get('/game/identifiers', getGameIdentifiers)

router.get('/game/:gameId', getGame);

// router.get('/user/:userId/profile', getUserProfile)

router.get('/user/:userId/games', getUserGames)
router.get('/user/:userId/friends', getUserFriends);
router.get('/user/:userId/wishlist', getUserWishlist);

export default router;
