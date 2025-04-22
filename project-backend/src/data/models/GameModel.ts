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

const gameSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  genres: { type: [String], default: [] },
  releaseDate: { type: String, required: true },
  developer: { type: String, default: 'Unknown' },
  publisher: { type: String, default: 'Unknown' },
  image: { type: String, default: '' },
  priceCents: { type: Number, default: 0 },
  platforms: { type: [String], default: [] },
  tags: { type: [String], default: [] },
});

const GameModel = mongoose.model<IGame>('Game', gameSchema);

export default GameModel;
