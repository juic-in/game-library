import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface UserGameRefItem {
  game: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFriend {
  friend: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserReview {
  review: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserOwnedGames {
  items: UserGameRefItem[];
  public: boolean;
}

export interface IUserWishlist {
  items: UserGameRefItem[];
  public: boolean;
}

export interface IUserFriends {
  items: UserFriend[];
  public: boolean;
}

export interface IUserReviews {
  items: UserReview[];
  public: boolean;
}

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  oldPasswords: string[];
  profilePicture?: string;
  description?: string;
  ownedGames: IUserOwnedGames;
  wishlist: IUserWishlist;
  friends: IUserFriends;
  reviews: IUserReviews;
  emailVerified: boolean;
  lastLogin: Date;
  isAdmin: boolean;
  public: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  userId: string,
  username: string;
  profilePicture?: string;
  description?: string;
  ownedGames?: IUserOwnedGames;
  wishlist?: IUserWishlist;
  friends?: IUserFriends;
  lastLogin?: Date;
  createdAt?: Date;
  reviews?: IUserReviews[];
}

const userGameRefItemSchema = new Schema(
  {
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  },
  { _id: false, timestamps: true }
); // prevent extra _id in subdocuments

const userFriendSchema = new Schema(
  {
    friend: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { _id: false, timestamps: true }
);

const userReviewSchema = new Schema(
  {
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
      required: true,
    },
  },
  { _id: false, timestamps: true }
);

const userOwnedGameSchema = new Schema<IUserOwnedGames>(
  {
    items: [userGameRefItemSchema],
    public: { type: Boolean, default: true },
  },
  { _id: false }
);

const userWishlistSchema = new Schema<IUserWishlist>(
  {
    items: [userGameRefItemSchema],
    public: { type: Boolean, default: true },
  },
  { _id: false }
);

const userFriendsSchema = new Schema<IUserFriends>(
  {
    items: [userFriendSchema],
    public: { type: Boolean, default: true },
  },
  { _id: false }
);

const userReviewsSchema = new Schema<IUserReviews>(
  {
    items: [userReviewSchema],
    public: { type: Boolean, default: true },
  },
  { _id: false }
);

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true, unique: true, minLength: 1 },
    password: { type: String, required: true, unique: true, minLength: 8 },
    oldPasswords: {
      type: [String],
      default: [],
    },
    profilePicture: { type: String },
    description: { type: String },
    ownedGames: [userOwnedGameSchema],
    wishlist: [userWishlistSchema],
    friends: [userFriendsSchema],
    reviews: [userReviewsSchema],
    emailVerified: { type: Boolean, default: false, required: true },
    lastLogin: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false, required: true },
    public: { type: Boolean, default: true, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.post('save', (doc, next) => {
  console.log(
    `[Log - ${new Date().toISOString()}] The user with the id of (${
      doc._id
    }) has been created/updated and saved`
  );
  next();
});

export const User = mongoose.model<IUser>('User', userSchema);
