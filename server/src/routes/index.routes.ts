import { Router } from 'express';

import { HealthRouter } from './health.routes';
import { UserRouter } from './users.routes';
import { TaskRouter } from './tasks.routes';

const router: Router = Router();

router.use('/api/health', HealthRouter);
router.use('/api/users', UserRouter);
router.use('/api/tasks', TaskRouter);

export { router };
