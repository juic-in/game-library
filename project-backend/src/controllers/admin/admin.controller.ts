import { Request, Response } from 'express';
import { clearAll, adminAddGame, adminDeleteGame, adminUpdateGame } from './admin';
import { getAllUsers } from '../../data/db/dbUser';

export const createGame = async (req: Request, res: Response) => {
  try {
    const gameData = req.body;
    const result = await adminAddGame(gameData);
    return res.status(200).json({ success: true, data: result });
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
    return res.status(200).json({ success: true, data: result });
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
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const clear = async (req: Request, res: Response) => {
  try {
    res.status(200).json(clearAll());
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error encountered when erasing database',
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await getAllUsers();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};
