/**
 * This file interacts directly with the database for any game related data
 */

import { NotFoundError } from '../../utils/errors';
import GameModel from '../models/GameModel';
import { Types } from 'mongoose';

export const addGame = async (game: any) => {
  const newGame = new GameModel(game);
  await newGame.save();
  return newGame;
};

export const updateGame = async (gameId: string, updateData: any) => {
  if (!Types.ObjectId.isValid(gameId))
    throw new NotFoundError('Invalid Game Id');

  const updatedGame = await GameModel.findByIdAndUpdate(gameId, updateData, {
    new: true,
  });
  return updatedGame;
};

export const findGameById = async (gameId: string) => {
  if (!Types.ObjectId.isValid(gameId))
    throw new NotFoundError('Invalid Game Id');

  const game = await GameModel.findById(gameId);
  return game;
};

export const deleteGameById = async (gameId: string) => {
  if (!Types.ObjectId.isValid(gameId))
    throw new NotFoundError('Invalid Game Id');

  const deletedGame = await GameModel.findByIdAndDelete(gameId);
  return deletedGame;
};

export const findGameByNameAndReleaseDate = async (
  name: string,
  releaseDate: string,
  toggleReleaseSearch: boolean = true
) => {
  let game;
  if (toggleReleaseSearch) {
    game = await GameModel.findOne({ name, releaseDate });
  } else {
    game = await GameModel.findOne({ name });
  }
  return game;
};

export const getAllGames = async () => {
  return await GameModel.find({});
};
