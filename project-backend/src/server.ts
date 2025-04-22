import express from 'express';
import { connectToDatabase } from './data/db/dbConnection';
import { adminAddGame, adminUpdateGame } from './gamelib';
import dotenv from 'dotenv';

dotenv.config();
const dbUri = process.env.DB_URI;
const dbName = process.env.DB_NAME;

const app = express();
app.use(express.json());

connectToDatabase().then(() => {
  console.log('Connected to database');

  app.post('/admin/games', async (req, res) => {
    try {
      const gameData = req.body;
      const { gameId } = await adminAddGame(gameData);
      res.status(200).json({ gameId });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  });

  app.put('/admin/games/:gameId', async (req, res) => {
    try {
      const { gameId } = req.params;
      const gameData = req.body;
      await adminUpdateGame(gameId, gameData);
      res.status(200).json({ gameId });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  });

  app.listen(3000, () => {
    console.log("Server is running");
  });
});
