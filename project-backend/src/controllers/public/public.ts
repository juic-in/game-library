import { findGameById, getAllGames } from "../../data/db/dbGame";
import { BadRequestError, InternalServerError } from "../../utils/errors";

export const gamesList = async () => {
  const result = getAllGames();
  if (!result) {
    throw new InternalServerError('Could not find the Games collection');
  }
  return result;
};

export const gameInfo = async (gameId: string) => {
  const result = await findGameById(gameId);
  if (!result) {
    throw new BadRequestError(`There is no such game with a id of ${gameId}`);
  }
  return result;
};