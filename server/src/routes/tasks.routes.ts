import { Router } from 'express';

import { TaskController } from '../controllers/tasks.controller';

const router: Router = Router();

router.post('/', TaskController.createTask);
router.get('/', TaskController.getTasks);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

export { router as TaskRouter };
