/**
 * This file interacts directly with the database for any game related data
 */

import { NotFoundError } from '../../utils/errors';
import { Types } from 'mongoose';
import { Game } from '../models/Game';

export const addGame = async (game: any) => {
  const newGame = new Game(game);
  await newGame.save();
  return newGame;
};

export const updateGame = async (gameId: string, updateData: any) => {
  if (!Types.ObjectId.isValid(gameId))
    throw new NotFoundError('Invalid Game Id');

  const updatedGame = await Game.findByIdAndUpdate(gameId, updateData, {
    new: true,
  });
  return updatedGame;
};

export const findGameById = async (gameId: string) => {
  if (!Types.ObjectId.isValid(gameId))
    throw new NotFoundError('Invalid Game Id');

  const game = await Game.findById(gameId);
  return game;
};

export const deleteGameById = async (gameId: string) => {
  if (!Types.ObjectId.isValid(gameId))
    throw new NotFoundError('Invalid Game Id');

  const deletedGame = await Game.findByIdAndDelete(gameId);
  return deletedGame;
};

export const findGameByNameAndReleaseDate = async (
  name: string,
  releaseDate: string,
  toggleReleaseSearch: boolean = true
) => {
  let game;
  if (toggleReleaseSearch) {
    game = await Game.findOne({ name, releaseDate });
  } else {
    game = await Game.findOne({ name });
  }
  return game;
};

export const getAllGames = async () => {
  return await Game.find({});
};

export const clearGames = async () => {
  await Game.deleteMany({})
}