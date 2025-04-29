import mongoose, { Schema, Document } from 'mongoose';

interface IGame extends Document {
  name: string;
  description: string;
  genres: string[];
  releaseDate: string;
  developer: string;
  publisher: string;
  image: string;
  priceCents: number;
  platforms: string[];
  tags: string[];
}

const gameSchema: Schema = new Schema(
  {
    name: { type: String, required: true, minLength: 3 },
    description: { type: String, required: true, default: '', minLength: 0 },
    genres: { type: [String], default: [] },
    releaseDate: { type: Date, default: Date.now },
    developer: { type: String, default: 'Unknown' },
    publisher: { type: String, default: 'Unknown' },
    image: { type: String, default: '' },
    priceCents: { type: Number, default: 0 },
    platforms: { type: [String], default: [] },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

export const Game = mongoose.model<IGame>('Game', gameSchema);
