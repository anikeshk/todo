import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

export const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
};

export const createTestUser = async () => {
  const collections = mongoose.connection.collections;
  const user = {
    username: 'test',
    name: 'Test Test',
    password: 'Test123',
    email: 'test@todo.com',
  };
  await collections.users.insertOne(user);
};

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

export const getAllTasks = async () => {
  const collections = mongoose.connection.collections;
  const tasks = await collections.tasks.find({}).toArray();
  return tasks;
};
