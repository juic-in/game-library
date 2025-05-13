import { addGame, clearGames, deleteGameById, findGameById, findGameByNameAndReleaseDate, updateGame } from "../../data/db/dbGame";
import { clearUsers } from "../../data/db/dbUser";
import { BadRequestError } from "../../utils/errors";
import { validateGameName, validateGameDescription } from "../../utils/gameUtil";
import { Game } from "../../utils/interface";


export const adminAddGame = async (game: Game) => {
  // TODO: Update this to be more lenient
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
  const existingGame = await findGameById(gameId);
  if (!existingGame) {
    throw new BadRequestError(`Game with ID ${gameId} does not exist.`);
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
  return {}
}
