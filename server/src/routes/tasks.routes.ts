import { Router } from 'express';

import { TaskController } from '../controllers/tasks.controller';

const router: Router = Router();

router.post('/', TaskController.createTask);
router.get('/', TaskController.getTasks);
router.patch('/:id', TaskController.updateTask);
router.get('/complete/:id', TaskController.completeTask);
router.delete('/:id', TaskController.deleteTask);

export { router as TaskRouter };
