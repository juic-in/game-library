import express from 'express';
import { requireUserAuth } from '../middleware/authMiddleware';
import {
  addToUserFriends,
  addToUserLib,
  addToUserWishlist,
  checkGameInWishlist,
  checkGameIsOwned,
  checkIsFriended,
  getUserFriends,
  getUserGames,
  getUserWishlist,
  removeFromUserFriends,
  removeFromUserLib,
  removeFromUserWishlist,
} from '../controllers/user/user.controller';

const router = express.Router();

router.use(requireUserAuth);

router.post('/games/:gameId', addToUserLib);

router.delete('/games/:gameId', removeFromUserLib);

router.post('/wishlist/:gameId', addToUserWishlist);

router.delete('/wishlist/:gameId', removeFromUserWishlist);

router.post('/friends/:friendId', addToUserFriends);

router.delete('/friends/:friendId', removeFromUserFriends);

router.get('/games', getUserGames);

router.get('/wishlist', getUserWishlist);

router.get('/friends', getUserFriends);

// check routes

router.get('/check/games/:gameId', checkGameIsOwned);

router.get('/check/wishlist/:gameId', checkGameInWishlist);

router.get('/check/friends/:friendId', checkIsFriended);

export default router;
