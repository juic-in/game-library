import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IUserOwnedGame {
  game: mongoose.Types.ObjectId;
  addedAt: Date;
}

export interface IUserWishlist {
  game: mongoose.Types.ObjectId;
  wishedAt: Date;
}

export interface IUserFriends {
  friend: mongoose.Types.ObjectId;
  addedAt: Date;
}

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  oldPasswords: string[];
  profilePicture?: string;
  description?: string;
  ownedGames: IUserOwnedGame[];
  wishlist: IUserWishlist[];
  friends: IUserFriends[];
  emailVerified: boolean;
  timeJoined: Date;
  lastLogin: Date;
  isAdmin: boolean;
}

const userOwnedGameSchema = new Schema<IUserOwnedGame>({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  addedAt: { type: Date, default: Date.now },
});

const userWishlistSchema = new Schema<IUserWishlist>({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  wishedAt: { type: Date, default: Date.now },
});

const userFriendsSchema = new Schema<IUserFriends>({
  friend: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  addedAt: { type: Date, default: Date.now },
});

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true, unique: true, minLength: 1 },
    password: { type: String, required: true, unique: true, minLength: 8 },
    oldPasswords: {
      type: [String], // <-- Array of strings
      default: [],
    },
    profilePicture: { type: String },
    description: { type: String },
    ownedGames: [userOwnedGameSchema],
    wishlist: [userWishlistSchema],
    friends: [userFriendsSchema],
    emailVerified: { type: Boolean, default: false },
    timeJoined: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false, required: true },
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
