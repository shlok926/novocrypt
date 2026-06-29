import { Router } from 'express';
import { contentController } from '../controllers/content.controller';

export const contentRouter = Router();

contentRouter.get('/qday-stats', contentController.getQdayStats);
contentRouter.get('/threats', contentController.getThreats);
contentRouter.get('/articles', contentController.getArticles);
