import { Request, Response } from "express";

export async function getProfile(req: Request, res: Response) {
  res.json(req.user);
}