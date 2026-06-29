import { Router } from 'express';
import { algorithmController } from '../controllers/algorithms.controller';

export const algorithmsRouter = Router();

algorithmsRouter.get('/list', algorithmController.listAlgorithms);
algorithmsRouter.get('/compare', algorithmController.compareAlgorithms);
algorithmsRouter.get('/nist', algorithmController.getNISTStandards);
