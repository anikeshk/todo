import express, { Express } from 'express';

import { corsMiddleware, authMiddleware, notFoundMiddleware } from './middlewares/index';
import { router } from './routes/index.routes';

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
