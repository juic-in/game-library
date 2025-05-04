import mongoose, { Schema } from 'mongoose';

interface IReview {
  user: mongoose.Types.ObjectId;
  game: mongoose.Types.ObjectId;
  title: string;
  description: string;
  body: string;
  rating: number;
  upvotes: number;
  downvotes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    game: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
    title: { type: String, min: 1, max: 15, required: true },
    description: { type: String, max: 30 },
    body: { type: String, min: 10, max: 1000, required: true },
    rating: { type: Number, default: 0, required: true },
    upvotes: { type: Number, default: 0, required: true },
    downvotes: { type: Number, default: 0, required: true },
    views: { type: Number, default: 0, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.model<IReview>('Review', reviewSchema);
export default Review;
