import GameModel from '../models/GameModel';
import { Types } from 'mongoose';

export const addGame = async (game: any) => {
  const newGame = new GameModel(game);
  await newGame.save(); 
  return newGame;
};

export const updateGame = async (gameId: string, updateData: any) => {
  if (!Types.ObjectId.isValid(gameId)) return null;

  const updatedGame = await GameModel.findByIdAndUpdate(
    gameId,
    updateData,
    { new: true }
  );
  return updatedGame;
};

export const findGameById = async (gameId: string) => {
  if (!Types.ObjectId.isValid(gameId)) return null;

  const game = await GameModel.findById(gameId);
  return game;
};

export const findGameByNameAndReleaseDate = async (name: string, releaseDate: string) => {
  const game = await GameModel.findOne({ name, releaseDate });
  return game;
};
