import { Router, Request, Response } from 'express';
import * as qdayService from '../services/qday.service';

const router = Router();

/**
 * GET /api/qday/probability
 * Get current Q-Day probability score
 */
router.get('/probability', async (req: Request, res: Response) => {
  try {
    const probability = await qdayService.getQDayProbability();

    res.json({
      success: true,
      data: probability,
    });
  } catch (error) {
    console.error('Error calculating Q-Day probability:', error);
    res.status(500).json({ success: false, message: 'Failed to calculate Q-Day probability' });
  }
});

/**
 * GET /api/qday/progress
 * Get quantum computing milestones
 */
router.get('/progress', async (req: Request, res: Response) => {
  try {
    const milestones = await qdayService.getQuantumMilestones();

    res.json({
      success: true,
      data: {
        milestones,
        companies: [...new Set(milestones.map((m) => m.company))],
      },
    });
  } catch (error) {
    console.error('Error fetching quantum milestones:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch quantum milestones' });
  }
});

/**
 * GET /api/qday/experts
 * Get expert predictions
 */
router.get('/experts', async (req: Request, res: Response) => {
  try {
    const predictions = await qdayService.getExpertPredictions();

    res.json({
      success: true,
      data: predictions,
    });
  } catch (error) {
    console.error('Error fetching expert predictions:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch expert predictions' });
  }
});

/**
 * GET /api/qday/scenarios
 * Get Q-Day timeline scenarios
 */
router.get('/scenarios', async (req: Request, res: Response) => {
  try {
    const scenarios = await qdayService.getQDayScenarios();

    res.json({
      success: true,
      data: scenarios,
    });
  } catch (error) {
    console.error('Error fetching Q-Day scenarios:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch Q-Day scenarios' });
  }
});

/**
 * POST /api/qday/seed
 * Seed Q-Day data (development only)
 */
router.post('/seed', async (req: Request, res: Response) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({
        success: false,
        message: 'Seeding not allowed in production',
      });
    }

    await qdayService.seedQDayData();

    res.json({
      success: true,
      message: 'Q-Day data seeded successfully',
    });
  } catch (error) {
    console.error('Error seeding Q-Day data:', error);
    res.status(500).json({ success: false, message: 'Failed to seed Q-Day data' });
  }
});

export default router;
