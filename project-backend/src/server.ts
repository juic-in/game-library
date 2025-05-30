import express, {
  json,
  Request,
  Response,
  Express,
  ErrorRequestHandler,
  NextFunction,
} from 'express';
import { connectToDatabase } from './data/db/dbConnection';
import morgan from 'morgan';
import cors from 'cors';
import config from './config.json';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import adminRoutes from './routes/admin.route';
import publicRoutes from './routes/public.route';
import cookieParser from 'cookie-parser';
import { injectUserIntoView } from './middleware/authMiddleware';
import { Game } from './data/models/Game';

const app: Express = express();
app.use(express.json());
app.use(json());
app.use(morgan('dev'));
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  })
);
app.use(cookieParser());

const PORT: number = parseInt(process.env.PORT || config.port) || 6900;
const HOST: string = process.env.IP || '127.0.0.1';
const SERVER_URL: string = `${HOST}:${PORT}`;

async function updateImageFields() {
  try {
    const docs = await Game.find({ image: { $exists: true } });

    for (const doc of docs) {
      await Game.updateOne(
        { _id: doc._id },
        {
          $unset: { image: '' },
          $set: { images: { cardImage: '', contentImage: '' } },
        }
      );
    }

    console.log('Updated all image fields.');
  } catch (err) {
    console.error('Error updating images:', err);
  }
}

connectToDatabase().then(() => {
  console.log('Connected to database\n');
  app.get('*', injectUserIntoView);
  app.use('/api/admin/', adminRoutes);
  app.use('/api/user/auth/', authRoutes);
  app.use('/api/user/', userRoutes);
  app.use('/api/public/', publicRoutes);

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Global error:', err);

    res.status(err.statusCode || 500).json({
      success: false,
      error: err.message || 'Internal server error',
    });
  });

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
