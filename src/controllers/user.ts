import { Request, Response, Application } from "express";
import passport from 'passport';

async function getProfile(req: Request, res: Response) {
    res.json(req.user);
}

export function registerUserRoutes(app: Application) {
    app.get('/profile', passport.authenticate('bearer', { session: false }), getProfile);
}