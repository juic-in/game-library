import { BadRequestError, InternalServerError } from './errors';
import {
  addGame,
  updateGame,
  findGameById,
  findGameByNameAndReleaseDate,
  deleteGameById,
  getAllGames,
} from './data/db/game';
import { validateGameDescription, validateGameName } from './utils/gameUtil';

export const adminAddGame = async (game: {
  name: string;
  description: string;
  genres?: string[];
  releaseDate?: string;
  developer?: string;
  publisher?: string;
  image?: string;
  priceCents?: number;
  platforms?: string[];
  tags?: string[];
}) => {
  // TODO: Update this
  const releaseDate = game.releaseDate || new Date().toISOString();
  try {
    const existingGame = await findGameByNameAndReleaseDate(
      game.name,
      releaseDate,
      false
    );
    if (existingGame)
      throw new Error(
        'A game with similar information already exists - send a request to admin if potential error in algorithm'
      );
  } catch (error) {
    throw new BadRequestError(error.message);
  }
  try {
    validateGameName(game.name);
    validateGameDescription(game.description);
  } catch (error) {
    throw new BadRequestError(error.message);
  }

  const result = await addGame(game);

  return { gameId: result._id };
};

export const adminUpdateGame = async (
  gameId: string,
  game: {
    name?: string;
    description?: string;
    genres?: string[];
    releaseDate?: string;
    developer?: string;
    publisher?: string;
    image?: string;
    priceCents?: number;
    platforms?: string[];
    tags?: string[];
  }
) => {
  try {
    const existingGame = await findGameById(gameId);
    if (!existingGame) throw new Error('hi');
    await updateGame(gameId, game);
    return {};
  } catch (error) {
    throw new BadRequestError(`Game with ID ${gameId} does not exist.`);
  }
};

export const adminDeleteGame = async (gameId: string) => {
  try {
    const game = await deleteGameById(gameId);
    if (!game) throw new Error('hi');
    return game;
  } catch (error) {
    throw new BadRequestError(
      'GameId is invalid, does not map to an existing game'
    );
  }
};

export const adminGamesList = async () => {
  try {
    const result = getAllGames();
    return result;
  } catch (error) {
    throw new InternalServerError('Could not find the Games collection');
  }
};

export const adminGameInfo = async (gameId: string) => {
  try {
    const result = await findGameById(gameId);
    if (!result) throw new Error('hi')
    return result;
  } catch (error) {
    throw new BadRequestError(`There is no such game with a id of ${gameId}`);
  }
};
