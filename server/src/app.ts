import express, { Express } from 'express';

import { mongoose } from './databases/mongodb';

import { corsMiddleware, authMiddleware, notFoundMiddleware } from './middlewares/index';
import { router } from './routes/index.routes';

mongoose.run();

const app: Express = express();

app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  corsMiddleware,
  authMiddleware,
  router,
  notFoundMiddleware
);

export default app;
