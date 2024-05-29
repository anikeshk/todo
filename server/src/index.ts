import dotenv from 'dotenv';
dotenv.config();

import app from './app';

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
