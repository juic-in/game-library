import { findGameById } from '../../data/db/dbGame';
import { findUserById } from '../../data/db/dbUser';
import { User } from '../../data/models/User';
import { BadRequestError, UnauthorizedError } from '../../utils/errors';
import { checkGameInWishlist } from './user.controller';

export const userCheckGameIsOwned = async (userId: string, gameId: string) => {
  const { _id } = await findUserById(userId);
  const game = await findGameById(gameId);

  if (_id) throw new UnauthorizedError('Invalid User');
  if (!game) throw new BadRequestError('Invalid Game');

  if (!(await User.findOne({ _id, 'ownedGames.items': gameId })))
    throw new BadRequestError('Game is already owned');

  return {};
};

export const userCheckGameInWishlist = async (
  userId: string,
  gameId: string
) => {
  const { _id } = await findUserById(userId);
  const game = await findGameById(gameId);

  if (_id) throw new UnauthorizedError('Invalid User');
  if (!game) throw new BadRequestError('Invalid Game');

  if (!(await User.findOne({ _id, 'wishlist.items': gameId })))
    throw new BadRequestError('Game is already wishlisted');

  return {};
};

export const userCheckIsFriended = async (userId: string, friendId: string) => {
  const { _id } = await findUserById(userId);
  const friend = await findUserById(friendId);
  if (!_id || !friend) throw new UnauthorizedError('Invalid User');

  if (!(await User.findOne({ 'friends.items': friendId })))
    throw new BadRequestError('This user is already your friend');

  return {};
};

export const userAddGameToWishlist = async (userId: string, gameId: string) => {
  const { _id } = await findUserById(userId);
  const game = await findGameById(gameId);
  if (!_id) {
    throw new UnauthorizedError('Invalid User');
  } else if (!game) {
    throw new BadRequestError('Invalid Game');
  }
  if (await User.findOne({ _id, 'wishlist.items': gameId }))
    throw new BadRequestError('Game is already wishlisted');

  await User.updateOne(
    {
      _id,
    },
    {
      $push: { 'wishlist.items': { game: game._id } },
    }
  );

  return {};
};

export const userRemoveGameFromWishlist = async (
  userId: string,
  gameId: string
) => {
  const { _id } = await findUserById(userId);
  const game = await findGameById(gameId);
  if (!_id) {
    throw new UnauthorizedError('Invalid User');
  } else if (!game) {
    throw new BadRequestError('Invalid Game');
  }

  await User.updateOne(
    {
      _id,
    },
    {
      $pull: { 'wishlist.items': { game: game._id } },
    }
  );

  return {};
};
export const userAddGameToOwnedGames = async (
  userId: string,
  gameId: string
) => {
  const { _id } = await findUserById(userId);
  const game = await findGameById(gameId);
  if (!_id) {
    throw new UnauthorizedError('Invalid User');
  } else if (!game) {
    throw new BadRequestError('Invalid Game');
  }

  if (await User.findOne({ _id, 'ownedGames.items': gameId }))
    throw new BadRequestError('Game is already owned');

  await User.updateOne(
    {
      _id,
    },
    {
      $push: { 'ownedGames.items': { game: game._id } },
    }
  );

  await User.updateOne(
    {
      _id,
    },
    {
      $pull: { 'wishlist.items': { game: game._id } },
    }
  );

  return {};
};

export const userRemoveGameFromOwnedGames = async (
  userId: string,
  gameId: string
) => {
  const { _id } = await findUserById(userId);
  const game = await findGameById(gameId);
  if (!_id) {
    throw new UnauthorizedError('Invalid User');
  } else if (!game) {
    throw new BadRequestError('Invalid Game');
  }

  await User.updateOne(
    {
      _id,
    },
    {
      $pull: { 'ownedGames.items': { game: game._id } },
    }
  );

  return {};
};
export const userAddFriend = async (userId: string, friendId: string) => {
  const { _id } = await findUserById(userId);
  const friend = await findUserById(friendId);
  if (!_id || !friend) throw new UnauthorizedError('Invalid User');

  if (await User.findOne({ 'friends.items': friendId }))
    throw new BadRequestError('This user is already your friend');

  await User.updateOne(
    {
      _id,
    },
    {
      $push: { 'friends.items': { friend: friendId } },
    }
  );
};

export const userRemoveFriend = async (userId: string, friendId: string) => {
  const { _id } = await findUserById(userId);
  const friend = await findUserById(friendId);
  if (!_id || !friend) throw new UnauthorizedError('Invalid User');

  await User.updateOne(
    {
      _id,
    },
    {
      $pull: { 'friend.items': { friend: friendId } },
    }
  );
};

export const userGetOwnedGames = async (userId: string) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new UnauthorizedError('Invalid User');
  }
  return user.ownedGames.items;
};
export const userGetWishlist = async (userId: string) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new UnauthorizedError('Invalid User');
  }
  return user.wishlist.items;
};
export const userGetFriends = async (userId: string) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new UnauthorizedError('Invalid User');
  }
  return user.friends.items;
};
