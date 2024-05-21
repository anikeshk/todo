import { Router } from 'express';

import { HealthRouter } from './health.routes';
import { UserRouter } from './users.routes';

const router: Router = Router();

router.use('/api/health', HealthRouter);
router.use('/api/users', UserRouter);

export { router };
