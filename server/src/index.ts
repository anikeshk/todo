import dotenv from 'dotenv';
dotenv.config();

import { mongoose } from './databases/mongodb';
import app from './app';

mongoose.run();

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
