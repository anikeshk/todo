import request from 'supertest';
import app from '../../src/app';

import { connect, closeDatabase, clearDatabase, getAllTasks, createTestUser } from '../test-setup';

beforeAll(async () => {
  await connect();
  await createTestUser();
});

afterEach(async () => {
  await clearDatabase();
  await createTestUser();
});

afterAll(async () => {
  await closeDatabase();
});

describe('Task Routes', () => {
  describe('POST /tasks', () => {
    it('should create a new task', async () => {
      const res = await request(app)
        .post('/tasks')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Basic dGVzdDpUZXN0MTIz')
        .send({ content: 'Test Task' });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('content', 'Test Task');
      expect(res.body.data).toHaveProperty('completed', false);
      expect(res.body.data).toHaveProperty('assignee');
      expect(res.body.data).toHaveProperty('createdAt');
      expect(res.body).toHaveProperty('status', 'success');
      const tasks = await getAllTasks();
      expect(tasks).toHaveLength(1);
    });

    it('should return 400 if content is missing', async () => {
      const res = await request(app)
        .post('/tasks')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Basic dGVzdDpUZXN0MTIz')
        .send({ content: '' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('status', 'error');
      expect(res.body).toHaveProperty('code', 600);
      expect(res.body).toHaveProperty('message', 'Invalid input');
    });

    it('should return 500 if there is a database error', async () => {
      await closeDatabase();
      const res = await request(app)
        .post('/tasks')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Basic dGVzdDpUZXN0MTIz')
        .send({ content: 'Test Task' });
      await connect();
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('status', 'error');
      expect(res.body).toHaveProperty('message', 'Internal Sever Error');
    });
  });
});
