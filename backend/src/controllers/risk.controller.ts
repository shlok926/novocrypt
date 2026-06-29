import { Request, Response } from 'express';
import { AppError } from '../middleware/error.middleware';
import { riskService } from '../services/risk.service';

export const riskController = {
  async calculate(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      throw new AppError('Authentication required', 401);
    }

    const result = await riskService.calculateAndSave(userId, req.body);
    res.status(201).json({ success: true, data: result });
  },

  async history(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      throw new AppError('Authentication required', 401);
    }

    const items = await riskService.history(userId);
    res.json({ success: true, data: items });
  },

  async getById(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      throw new AppError('Authentication required', 401);
    }

    const item = await riskService.getById(userId, req.params.id);
    if (!item) {
      throw new AppError('Assessment not found', 404);
    }
    res.json({ success: true, data: item });
  },
};
