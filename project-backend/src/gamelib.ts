import { getData } from './data/dataStore';
import { BadRequestError } from './errors';
import { Game, GameId } from './interface';
import { generateUniqueId } from './other';

export function adminAddGame(
  game: {
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
  },
): GameId {
  const games = getData().games;
  // Replace with a better check
  const existingGame = games.find(g => g.name.toLowerCase() === game.name.toLowerCase().trim() && g.releaseDate === game.releaseDate);
  if (existingGame) {
    throw new BadRequestError(`Game with ID ${existingGame.gameId} already exists.`);
  }

  const gameId = generateUniqueId();
  const newGame: Game = {
    gameId,
    name: game.name,
    description: game.name,
    genres: game.genres || [],
    releaseDate: game.releaseDate || Date.now().toString(),
    developer: game.developer || 'Unknown',
    publisher: game.publisher || 'Unknown',
    image: game.image || '',
    priceCents: game.priceCents || 0,
    platforms: game.platforms || [],
    tags: game.tags || [],
  }
  
  games[gameId] = newGame;
  return { gameId }
}

export function adminUpdateGame(
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
  },
): GameId {
  const games = getData().games;
  const existingGame = games.find(g => g.gameId === gameId);
  if (!existingGame) {
    throw new BadRequestError(`Game with ID ${gameId} does not exist.`);
  }

  Object.assign(existingGame, game);

  return { gameId: existingGame.gameId }
}

