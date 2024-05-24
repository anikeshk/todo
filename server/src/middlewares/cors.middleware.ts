import cors from 'cors';

export const corsMiddleware = cors({
  origin: process.env.APP_URL,
  optionsSuccessStatus: 200,
});
