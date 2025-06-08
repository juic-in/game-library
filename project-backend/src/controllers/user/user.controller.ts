import { Request, Response } from 'express';
import {
  userAddFriend,
  userAddGameToOwnedGames,
  userAddGameToWishlist,
  userCheckGameInWishlist,
  userCheckGameIsOwned,
  userCheckIsFriended,
  userGetFriends,
  userGetOwnedGames,
  userGetWishlist,
  userRemoveFriend,
  userRemoveGameFromOwnedGames,
  userRemoveGameFromWishlist,
} from './users';
import { AuthenticatedRequest } from '../../middleware/authMiddleware';

/**
 * Routes maining for user interactions
 * - Check routes are used for conditionally rendering the frontend, as such will
 *   only contain the check component of the other routes.
 */

export const checkGameInWishlist = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { gameId } = req.params;
    const result = await userCheckGameInWishlist(req.user._id, gameId);
    res.status(200).json({ success: true, data: 'Wished' });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const checkGameIsOwned = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { gameId } = req.params;
    const result = await userCheckGameIsOwned(req.user._id, gameId);
    res.status(200).json({ success: true, data: 'Owned' });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const checkIsFriended = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { friendId } = req.params;
    const result = await userCheckIsFriended(req.user._id, friendId);
    res.status(200).json({ success: true, data: 'Friended' });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const addToUserLib = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { gameId } = req.params;
    const result = await userAddGameToOwnedGames(req.user._id, gameId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const removeFromUserLib = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { gameId } = req.params;
    const result = await userRemoveGameFromOwnedGames(req.user._id, gameId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const addToUserWishlist = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { gameId } = req.params;
    const result = await userAddGameToWishlist(req.user._id, gameId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const removeFromUserWishlist = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { gameId } = req.params;
    const result = await userRemoveGameFromWishlist(req.user._id, gameId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const addToUserFriends = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { friendId } = req.params;
    const result = await userAddFriend(req.user._id, friendId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const removeFromUserFriends = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { friendId } = req.params;
    const result = await userRemoveFriend(req.user._id, friendId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const getUserGames = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const result = await userGetOwnedGames(req.user._id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const getUserWishlist = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const result = await userGetWishlist(req.user._id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const getUserFriends = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const result = await userGetFriends(req.user._id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};
