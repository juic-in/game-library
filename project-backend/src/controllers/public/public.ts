import { createDeflate } from 'zlib';
import { findGameById, getAllGames } from '../../data/db/dbGame';
import { findUserById } from '../../data/db/dbUser';
import { UserProfile } from '../../data/models/User';
import { BadRequestError, InternalServerError } from '../../utils/errors';

export const gamesList = async () => {
  const result = getAllGames();
  if (!result) {
    throw new InternalServerError('Could not find the Games collection');
  }
  return result;
};

export const gameInfo = async (gameId: string) => {
  const game = await findGameById(gameId);
  if (!game) {
    throw new BadRequestError(`There is no such game with a id of ${gameId}`);
  }
  return game;
};

export const userInfo = async (userId: string) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new BadRequestError(`There is no such user with a id of ${userId}`);
  }

  let userProfile: UserProfile = {
    userId,
    username: user.username,
    profilePicture: user.profilePicture,
  };
  if (!user.public) {
    return userProfile;
  } else {
    return {
      ...userProfile,
      ...(user.ownedGames.public ? { ownedGames: user.ownedGames.items } : {}),
      ...(user.wishlist.public ? { wishlist: user.wishlist.items } : {}),
      ...(user.friends.public ? { friends: user.friends.items } : {}),
      ...(user.friends.public ? { friends: user.reviews.items } : {}),
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
    };
  }
};
