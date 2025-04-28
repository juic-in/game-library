import express, { json, Request, Response } from 'express';
import { connectToDatabase } from './data/db/dbConnection';
import morgan from 'morgan';
import cors from 'cors';
import config from './config.json';
import { clear } from './other';
import gameRoutes from './routes/game.route'


const app = express();
app.use(express.json());
app.use(json());
app.use(morgan('dev'));
app.use(cors());

const PORT: number = parseInt(process.env.PORT || config.port) || 6900;
const HOST: string = process.env.IP || '127.0.0.1';
const SERVER_URL: string = `${HOST}:${PORT}`;

connectToDatabase().then(() => {
  console.log('Connected to database');
  app.delete('/api/admin/clear', async (req: Request, res: Response) => {
    try {
      await clear();
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.use('/api/games', gameRoutes)

  app.use((req: Request, res: Response) => {
    const error = `
      Route not found - This could be because:
        0. You have defined routes below (not above) this middleware in server.ts
        1. You have not implemented the route ${req.method} ${req.path}
        2. There is a typo in either your test or server, e.g. /posts/list in one
           and, incorrectly, /post/list in the other
        3. You are using ts-node (instead of ts-node-dev) to start your server and
           have forgotten to manually restart to load the new changes
        4. You've forgotten a leading slash (/), e.g. you have posts/list instead
           of /posts/list in your server.ts or test file
    `;
    res.status(404).json({ error });
  });

  // start server
  const server = app.listen(PORT, HOST, () => {
    // DO NOT CHANGE THIS LINE
    console.log(`⚡️ Server started on port ${PORT} at ${HOST}`);
  });

  // For coverage, handle Ctrl+C gracefully
  process.on('SIGINT', () => {
    server.close(() => {
      console.log('Shutting down server gracefully.');
      process.exit();
    });
  });
});
