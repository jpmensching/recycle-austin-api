import { Request, Response, Application } from "express";
import { User } from '../models';

async function login(req: Request, res: Response) {
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  });

    if (!user) {
      res.status(400).json({
          error: 'User not found!'
      });
      return;
    }

    const token = (new Date()).getMilliseconds();
    await user.update({
      token
    });
    res.json(user);
}

export function registerAuthRoutes(app: Application) {
  app.post('/login', login);
}