import { Request, Response } from 'express';
import { labService } from '../services/lab.service';
import { AppError } from '../middleware/error.middleware';

const serializeSession = (row: {
  classicalTimeMs: { toFixed: (digits: number) => string } | number | string;
  quantumTimeMs: { toFixed: (digits: number) => string } | number | string;
  [key: string]: unknown;
}) => ({
  ...row,
  classicalTimeMs:
    typeof row.classicalTimeMs === 'object' && row.classicalTimeMs !== null && 'toFixed' in row.classicalTimeMs
      ? row.classicalTimeMs.toFixed(2)
      : String(row.classicalTimeMs),
  quantumTimeMs:
    typeof row.quantumTimeMs === 'object' && row.quantumTimeMs !== null && 'toFixed' in row.quantumTimeMs
      ? row.quantumTimeMs.toFixed(2)
      : String(row.quantumTimeMs),
});

export const labController = {
  async create(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      throw new AppError('Authentication required', 401);
    }

    const created = await labService.create(userId, req.body);
    res.status(201).json({ success: true, data: serializeSession(created) });
  },

  async history(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      throw new AppError('Authentication required', 401);
    }

    const items = await labService.history(userId);
    res.json({
      success: true,
      data: items.map((item: (typeof items)[number]) => serializeSession(item)),
    });
  },

  async getById(req: Request, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) {
      throw new AppError('Authentication required', 401);
    }

    const row = await labService.getById(userId, req.params.id);
    if (!row) {
      throw new AppError('Lab session not found', 404);
    }

    res.json({ success: true, data: serializeSession(row) });
  },
};
