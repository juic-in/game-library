import express from 'express';
import { connectToDatabase } from './data/db/dbConnection';
import { adminAddGame, adminUpdateGame } from './gamelib';

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
      const statusCode = (error instanceof Error && 'statusCode' in error) ? (error as any).statusCode : 500;
      const message = (error instanceof Error) ? error.message : 'An unknown error occurred';
      res.status(statusCode).json({ error: message });
    }
  });

  app.put('/admin/games/:gameId', async (req, res) => {
    try {
      const { gameId } = req.params;
      const gameData = req.body;
      await adminUpdateGame(gameId, gameData);
      res.status(200).json({ gameId });
    } catch (error) {
      const statusCode = (error instanceof Error && 'statusCode' in error) ? (error as any).statusCode : 500;
      const message = (error instanceof Error) ? error.message : 'An unknown error occurred';
      res.status(statusCode).json({ error: message });
    }
  });

  app.listen(3000, () => {
    console.log('Server is running');
  });
});
