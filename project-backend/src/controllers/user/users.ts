import { findGameById } from '../../data/db/dbGame';
import { findUserById } from '../../data/db/dbUser';
import { User } from '../../data/models/User';
import { BadRequestError, UnauthorizedError } from '../../utils/errors';

export const userAddGameToWishlist = async (userId: string, gameId: string) => {
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
      $push: { wishlist: { game: game._id } },
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
      $pull: { wishlist: { game: game._id } },
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

  await User.updateOne(
    {
      _id,
    },
    {
      $push: { ownedGames: { game: game._id } },
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
      $pull: { ownedGames: { game: game._id } },
    }
  );

  return {};
};
export const userAddFriend = async (userId: string, friendId: string) => {
  const { _id } = await findUserById(userId);
  const friend = await findUserById(friendId);
  if (!_id) {
    throw new UnauthorizedError('Invalid User');
  } else if (await User.findOne({
    friends: friendId
  })) {
    throw new BadRequestError('This user is already your friend')
  }

  await User.updateOne(
    {
      _id,
    },
    {
      $push: { friends: { friend: friend._id}}
    }
  )
}
export const userRemoveFriend = async (userId: string, friendId: string) => {
  const { _id } = await findUserById(userId);
  const friend = await findUserById(friendId);
  if (!_id) {
    throw new UnauthorizedError('Invalid User');
  } else if (!await User.findOne({
    friends: friendId
  })) {
    throw new BadRequestError('This user not your friend')
  }

  await User.updateOne(
    {
      _id,
    },
    {
      $pull: { friends: { friend: friend._id}}
    }
  )
}

export const userGetOwnedGames = async (userId: string) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new UnauthorizedError('Invalid User')
  }
  return user.ownedGames.items;
}
export const userGetWishlist = async (userId: string) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new UnauthorizedError('Invalid User')
  }
  return user.wishlist.items;
}
export const userGetFriends = async (userId: string) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new UnauthorizedError('Invalid User')
  }
  return user.friends.items;
}

