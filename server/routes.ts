import { Router } from 'express'
import { authRouter } from '../app/auth';
import { locationsRouter } from '../app/locations';
import { userRouter } from '../app/users';

export const router = Router();

router.use(authRouter);
router.use(locationsRouter);
router.use(userRouter);