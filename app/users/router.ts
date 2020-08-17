import { Router } from 'express';
import passport from 'passport';
import { getProfile } from './user-controller';

export const userRouter = Router();

userRouter.get('/profile', passport.authenticate('bearer', { session: false }), getProfile);

