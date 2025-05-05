import { Request, Response } from 'express';
import { gameInfo, gamesList, userGames } from './public';

export const getGamesList = async (req: Request, res: Response) => {
  try {
    const result = await gamesList();
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
