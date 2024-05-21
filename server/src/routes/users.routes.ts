import { Router } from 'express';

import { UserController } from '../controllers/users.controllers';

const router: Router = Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

export { router as UserRouter };
