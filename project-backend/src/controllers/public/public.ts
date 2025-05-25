import { findGameById, getAllGames } from '../../data/db/dbGame';
import { findUserById } from '../../data/db/dbUser';
import { UserProfile } from '../../data/models/User';
import { BadRequestError, InternalServerError, UnauthorizedError } from '../../utils/errors';

export const gamesList = async () => {
  const result = await getAllGames();
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

// Break up later on
export const userGames = async (userId: string) => {
  const user = await findUserById(userId);  
  if (!user) {
    throw new BadRequestError(`There is no such user with a id of ${userId}`);
  }

  const { ownedGames } = user
  if (!ownedGames.public) throw new UnauthorizedError('This user\'s games are private');
  else {
    return ownedGames.items 
  }
}

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

export const userGetWishlist = async (userId: string) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new UnauthorizedError('Invalid User')
  }

  const { public: isPublic, items} = user.wishlist
  if (isPublic) {
    return items
  } else throw new UnauthorizedError('This user\'s wishlist is private')

}
export const userGetFriends = async (userId: string) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new UnauthorizedError('Invalid User')
  }

  const { public: isPublic, items} = user.wishlist
  if (isPublic) {
    return items
  } else throw new UnauthorizedError('This user\'s friends list is private')
}

export async function getGameRefs() {
  const result = await getAllGames();
  if (!result) {
    throw new InternalServerError('Could not find the Games collection');
  }
  return result.map((game) => ({ gameId: game._id, name: game.name }));
}
