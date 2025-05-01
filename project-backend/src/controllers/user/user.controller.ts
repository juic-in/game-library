import { Request, Response } from 'express';
import {
  userAddFriend,
  userAddGameToOwnedGames,
  userAddGameToWishlist,
  userGetFriends,
  userGetOwnedGames,
  userGetWishlist,
  userRemoveFriend,
  userRemoveGameFromOwnedGames,
  userRemoveGameFromWishlist,
} from './users';
import { AuthenticatedRequest } from '../../middleware/authMiddleware';

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
    const { gameId } = req.params;
    const result = await userAddFriend(req.user._id, gameId);
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
    const { gameId } = req.params;
    const result = await userRemoveFriend(req.user._id, gameId);
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