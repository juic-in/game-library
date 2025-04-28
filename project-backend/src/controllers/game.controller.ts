import {
  adminAddGame,
  adminDeleteGame,
  adminGameInfo,
  adminGamesList,
  adminUpdateGame,
} from './gamelib';
import { Request, Response } from 'express';

export const createGame = async (req: Request, res: Response) => {
  try {
    const gameData = req.body;
    const result = await adminAddGame(gameData);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const updateGame = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const gameData = req.body;
    const result = await adminUpdateGame(gameId, gameData);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const deleteGame = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const result = await adminDeleteGame(gameId);
    res.json(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const getGamesList = async (req: Request, res: Response) => {
  try {
    const result = await adminGamesList();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const getGame = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const result = await adminGameInfo(gameId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};
