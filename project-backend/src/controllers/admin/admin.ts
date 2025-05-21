import {
  addGame,
  clearGames,
  deleteGameById,
  findGameById,
  findGameByNameAndReleaseDate,
  updateGame,
} from '../../data/db/dbGame';
import { clearUsers } from '../../data/db/dbUser';
import { BadRequestError } from '../../utils/errors';
import { validateGame } from '../../utils/gameUtil';
import { Game, InitialGame } from '../../utils/interface';


// TODO: Add image url checks and/or allow imports
export const adminAddGame = async (game: InitialGame) => {
  // TODO: Update this to be more lenient
  const releaseDate = game.releaseDate || new Date().toISOString();
  try {
    const existingGame = await findGameByNameAndReleaseDate(
      game.name,
      releaseDate as string,
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
    validateGame(game);
  } catch (error) {
    throw new BadRequestError(error.message);
  }

  const result = await addGame(game);

  return { gameId: result._id };
};

export const adminUpdateGame = async (gameId: string, game: Game) => {
  const existingGame = await findGameById(gameId);
  if (!existingGame) {
    throw new BadRequestError(`Game with ID ${gameId} does not exist.`);
  }

  try {
    validateGame(game);
  } catch (error) {
    throw new BadRequestError(error.message);
  }

  await updateGame(gameId, game);
  return {};
};

export const adminDeleteGame = async (gameId: string) => {
  const game = await deleteGameById(gameId);
  if (!game) {
    throw new BadRequestError(
      'GameId is invalid, does not map to an existing game'
    );
  }
  return game;
};

export async function clearAll() {
  await clearGames();
  await clearUsers();
  return {};
}
