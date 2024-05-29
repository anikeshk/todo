import { Router } from 'express';

import { HealthRouter } from './health.routes';
import { UserRouter } from './users.routes';
import { TaskRouter } from './tasks.routes';

const router: Router = Router();

router.use('/health', HealthRouter);
router.use('/users', UserRouter);
router.use('/tasks', TaskRouter);

export { router };
