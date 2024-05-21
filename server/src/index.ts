import dotenv from 'dotenv';
import express, { Express } from 'express';

import { mongoose } from './databases/mongodb';

import { corsMiddleware, authMiddleware, notFoundMiddleware } from './middlewares/index';
import { router } from './routes/index.routes';

dotenv.config();
mongoose.run();

const app: Express = express();

app.use(
  express.json({ limit: '10mb' }),
  express.urlencoded({ limit: '10mb', extended: true }),
  corsMiddleware,
  authMiddleware,
  router,
  notFoundMiddleware
);

app.listen(process.env.SERVER_PORT);
