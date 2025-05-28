import mongoose from 'mongoose';
import { connectToDatabase } from '../data/db/dbConnection';
import { Game } from '../data/models/Game';

connectToDatabase().then(async () => {
  console.log('Connected to MongoDB');

  try {
    const docs = await Game.find({ image: { $exists: true } });

    for (const doc of docs) {
      const cardImage = doc.image;

      await Game.updateOne(
        { _id: doc._id },
        {
          $unset: { image: '' },
          $set: { images: { cardImage: cardImage, contentImage: '' } },
        }
      );
    }

    console.log(
      'Replaced "image" with "images.cardImage and images.contentImage" in all matching documents.'
    );
  } catch (err) {
    console.error('Error updating documents:', err);
  } finally {
    mongoose.disconnect();
  }
});
