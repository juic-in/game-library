import { Request, Response } from 'express';
import {
  gameInfo,
  gamesList,
  getGameRefs,
  userGames,
  userGetFriends,
  userGetWishlist,
} from './public';

export const getGamesList = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.search as string  || '';
    const page = parseInt(req.query.page as string) || 1;
    const result = await gamesList({searchQuery, page});
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const getGame = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const result = await gameInfo(gameId);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const getUserGames = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userGames(userId);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const getUserWishlist = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userGetWishlist(userId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const getUserFriends = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userGetFriends(userId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const getGameIdentifiers = async (req: Request, res: Response) => {
  try {
    const result = await getGameRefs();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};
