import { Router } from 'express'
import { authRouter } from '../app/auth';
import { userRouter } from '../app/users';

export const router = Router();

router.use(authRouter);
router.use(userRouter);