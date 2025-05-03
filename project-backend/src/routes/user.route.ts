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

router.post('/:gameId/lib', addToUserLib);

router.delete('/:gameId/lib', removeFromUserLib);

router.post('/:gameId/wishlist', addToUserWishlist);

router.delete('/:gameId/wishlist', removeFromUserWishlist);

router.post('/:gameId/friends', addToUserFriends);

router.delete('/:gameId/friends', removeFromUserFriends);

router.get('/lib', getUserGames);

router.get('/wishlist', getUserWishlist);

router.get('/friends', getUserFriends);

export default router;
