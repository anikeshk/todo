import express, { Express } from 'express';

import { mongoose } from './databases/mongodb';

import { corsMiddleware, authMiddleware, notFoundMiddleware } from './middlewares/index';
import { router } from './routes/index.routes';

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

export default app;
