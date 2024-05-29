import { Request, Response } from 'express';
import { TaskController } from '../../src/controllers/tasks.controller';
import { Task } from '../../src/models/tasks.models';

jest.mock('../../src/models/tasks.models', () => ({
  Task: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
  })),
}));

describe('TaskController', () => {
  describe('createTask', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let status: jest.Mock;
    let json: jest.Mock;

    beforeEach(() => {
      req = {
        body: {
          content: 'Test task content',
          usermeta: {
            _id: 'user123',
          },
        },
      };
      status = jest.fn().mockReturnThis();
      json = jest.fn();
      res = {
        status,
        json,
      };
      (Task as any).mockClear();
    });

    it('should create a new task and return it with a 200 status', async () => {
      const mockSave = jest.fn().mockResolvedValue({
        _id: 'task123',
        content: 'Test task content',
        completed: false,
        assignee: 'user123',
        createdAt: new Date(),
      });
      (Task as any).mockImplementation(() => ({
        save: mockSave,
      }));

      await TaskController.createTask(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({
        data: {
          id: 'task123',
          content: 'Test task content',
          completed: false,
          assignee: 'user123',
          createdAt: expect.any(Date),
        },
        status: 'success',
      });
    });

    it('should return 400 if content is missing', async () => {
      req.body.content = '';

      await TaskController.createTask(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Invalid input',
        code: 600,
      });
    });

    it('should return 500 if an error occurs', async () => {
      const error = new Error('Test error');
      (Task as any).mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(error),
      }));

      await TaskController.createTask(req as Request, res as Response);

      expect(status).toHaveBeenCalledWith(500);
      expect(json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Internal Sever Error',
        code: 500,
      });
    });
  });
});
