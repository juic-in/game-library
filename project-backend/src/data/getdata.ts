import { getData } from './dataStore';
import { User } from '../interface';
import { UnauthorizedError } from '../errors';

export function getUserById(userId: string): User {
  const user = getData().users[userId];
  if (!user) {
    throw new UnauthorizedError('User not found');
  }
  return user;
}

export function getUserBySession(session: string): User {
  const user = getData().sessions[session];
  if (!user) {
    throw new UnauthorizedError('User not found');
  }
  return user;
}

export function getUserByEmail(email: string): User {
  const user = getData().users.find((user) => user.email === email);
  if (!user) {
    throw new UnauthorizedError('User not found');
  }
  return user;
}

export function getGameById(gameId: string) {
  const game = getData().games[gameId];
  if (!game) {
    throw new UnauthorizedError('Game not found');
  }
  return game;
}
