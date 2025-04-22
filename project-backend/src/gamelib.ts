
import { BadRequestError } from './errors';
import {
  addGame,
  updateGame,
  findGameById,
  findGameByNameAndReleaseDate,
} from './data/db/game';


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
  const releaseDate = game.releaseDate || new Date().toISOString();
  const existingGame = await findGameByNameAndReleaseDate(
    game.name,
    releaseDate
  );
  if (existingGame) {
    throw new BadRequestError(
      `Game with the same name and release date already exists.`
    );
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

  return { gameId };
};


