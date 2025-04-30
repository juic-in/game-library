import mongoose from 'mongoose';
const { Schema } = mongoose;

const userOwnedGameSchema = new Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  addedAt: { type: Date, default: Date.now },
});

const userWishedGameSchema = new Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  wishedAt: { type: Date, default: Date.now },
});

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true, unqiue: true, minLength: 1 },
    password: { type: String, required: true, unqiue: true, minLength: 8 },
    oldPasswords: {
      type: [String], // <-- Array of strings
      default: [],
    },
    profilePicture: { type: String },
    description: { type: String },
    ownedGames: [userOwnedGameSchema],
    wishlist: [userWishedGameSchema],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    emailVerified: { type: Boolean, default: false },
    timeJoined: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false, required: true }
  },
  {
    timestamps: true,
  }
);

userSchema.post('save', (doc, next) => {
  console.log(
    `[Log - ${new Date().toISOString()}] The user with the id of (${doc._id}) has been created/updated and saved`
  );
  next();
});

export const User = mongoose.model('User', userSchema);
