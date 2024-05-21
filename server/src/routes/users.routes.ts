import { Router } from 'express';

import { UserController } from '../controllers/users.controllers';

const router: Router = Router();

router.post('/register', UserController.registerPublisher);

export { router as UserRouter };
