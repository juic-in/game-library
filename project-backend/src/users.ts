import {
  UserOwnedGameData,
  UserWishedGameData,
  UserProfile,
} from './interface';
import { getUserById } from './data/getdata';

export function userAddGameToWishlist(userId, gameId) {
  const user = getUserById(userId);
  if (!user.wishlist) {
    user.wishlist = [];
  }
  if (!user.wishlist.includes(gameId)) {
    user.wishlist.push(gameId);
  }
}
export function userRemoveGameFromWishlist(userId, gameId) {
  const user = getUserById(userId);
  if (user.wishlist) {
    user.wishlist = user.wishlist.filter((g) => g !== gameId);
  }
}
export function userAddGameToOwnedGames(userId, gameId) {
  const user = getUserById(userId);
  if (!user.ownedGames) {
    user.ownedGames = [];
  }
  if (!user.ownedGames.includes(gameId)) {
    user.ownedGames.push(gameId);
  }
}
export function userRemoveGameFromOwnedGames(userId, gameId) {
  const user = getUserById(userId);
  if (user.ownedGames) {
    user.ownedGames = user.ownedGames.filter((g) => g !== gameId);
  }
}
export function userAddFriend(userId, friendId) {
  const user = getUserById(userId);
  const friend = getUserById(friendId);

  if (!user.friends) {
    user.friends = [];
  }
  if (!user.friends.includes(friend)) {
    user.friends.push(friend);
  }
}
export function userRemoveFriend(userId, friend) {
  const user = getUserById(userId);
  if (user.friends) {
    user.friends = user.friends.filter((f) => f !== friend);
  }
}
export function userUpdateProfile(userId, profile: UserProfile) {
  const user = getUserById(userId);
  if (profile.nameFirst) {
    user.nameFirst = profile.nameFirst;
  }
  if (profile.nameLast) {
    user.nameLast = profile.nameLast;
  }
  if (profile.email) {
    user.email = profile.email;
  }
}
export function userGetProfile(userId) {
  const user = getUserById(userId);
  return {
    nameFirst: user.nameFirst,
    nameLast: user.nameLast,
    email: user.email,
    ownedGames: user.ownedGames,
    wishlist: user.wishlist,
    friends: user.friends,
  };
}
export function userGetOwnedGames(userId) {
  const user = getUserById(userId);
  return user.ownedGames || [];
}
export function userGetWishlist(userId) {
  const user = getUserById(userId);
  return user.wishlist || [];
}
export function userGetFriends(userId) {
  const user = getUserById(userId);
  return user.friends || [];
}
export function userGetGameDetails(
  userId,
  gameId
): UserOwnedGameData | UserWishedGameData {
  const user = getUserById(userId);
  const game =
    user.ownedGames.find((g) => g.gameId === gameId) ||
    user.wishlist.find((g) => g.gameId === gameId);
  if (!game) {
    throw new Error('Game not found');
  }
  return game;
}
export function userGetGameReviews(userId, gameId) {
  const user = getUserById(userId);
  const game =
    user.ownedGames.find((g) => g.gameId === gameId) ||
    user.wishlist.find((g) => g.gameId === gameId);
  if (!game) {
    throw new Error('Game not found');
  }
  return game.reviews || [];
}
