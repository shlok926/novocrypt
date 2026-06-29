import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth.middleware';

export const reportsRouter = Router();

// Generate report
reportsRouter.post('/generate', requireAuth, async (req: Request, res: Response) => {
  try {
    const { assessmentId } = req.body;
    const userId = req.user?.id;

    if (!userId || !assessmentId) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const fileUrl = `/reports/${assessmentId}-${Date.now()}.pdf`;
    const mockReport = {
      id: `report-${Date.now()}`,
      userId: userId,
      assessmentId: assessmentId,
      fileUrl: fileUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    res.json(mockReport);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate report' });
  }
});

// List reports
reportsRouter.get('/list', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const mockReports = [
      {
        id: 'report-1',
        userId: userId,
        assessmentId: 'assess-1',
        fileUrl: '/reports/report-1.pdf',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    res.json(mockReports);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reports' });
  }
});

// Get single report
reportsRouter.get('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const mockReport = {
      id: id,
      userId: userId,
      assessmentId: 'assess-1',
      fileUrl: `/reports/${id}.pdf`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    res.json(mockReport);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch report' });
  }
});
