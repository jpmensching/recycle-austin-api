import { Location } from './location';
import { Request, Response } from 'express';

export async function getAllLocations(req: Request, res: Response) {
  const locations = await Location.findAll();
  res.json(locations);
}