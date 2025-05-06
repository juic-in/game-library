import express from 'express';
import { requireUserAuth } from '../middleware/authMiddleware';
import {
  addToUserFriends,
  addToUserLib,
  addToUserWishlist,
  getUserFriends,
  getUserGames,
  getUserWishlist,
  removeFromUserFriends,
  removeFromUserLib,
  removeFromUserWishlist,
} from '../controllers/user/user.controller';

const router = express.Router();

router.use(requireUserAuth);

router.post('games/:gameId', addToUserLib);

router.delete('games/:gameId', removeFromUserLib);

router.post('games/:gameId/wishlist', addToUserWishlist);

router.delete('games/:gameId/wishlist', removeFromUserWishlist);

router.post('/:userId/friends', addToUserFriends);

router.delete('/:userId/friends', removeFromUserFriends);

router.get('/games', getUserGames);

router.get('/wishlist', getUserWishlist);

router.get('/friends', getUserFriends);

export default router;
