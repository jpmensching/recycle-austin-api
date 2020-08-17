import { Router } from 'express';
import { getAllLocations } from './locations-controller';

export const locationsRouter = Router();

locationsRouter.get('/locations', getAllLocations);