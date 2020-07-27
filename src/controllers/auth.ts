import { Application, Request, Response } from 'express';
import { User } from '../models';

function login(req: Request, res: Response) {
    res.send(req);
}

export function setupAuthRoutes(app: Application) {
    app.post('/auth/login', (req, res) => {
        login(req, res);
    });
}