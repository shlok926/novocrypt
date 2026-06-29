import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import * as threatsService from '../services/threats.service';

const router = Router();

// GET /api/threats/feed
router.get('/feed', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, category, severity } = req.query;
    const feed = await threatsService.getThreatFeed(
      parseInt(page as string),
      parseInt(limit as string),
      category as string | undefined,
      severity as string | undefined
    );
    res.json({ success: true, data: feed });
  } catch (error) {
    console.error('Error fetching threat feed:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch threat feed' });
  }
});

// GET /api/threats/live
router.get('/live', async (req: Request, res: Response) => {
  try {
    const liveThreats = await threatsService.fetchLiveQuantumThreats();
    res.json({ success: true, data: liveThreats });
  } catch (error) {
    console.error('Error fetching live threats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch live threats' });
  }
});

// GET /api/threats/level
router.get('/level', async (req: Request, res: Response) => {
  try {
    const threatLevel = await threatsService.calculateGlobalThreatLevel();
    res.json({ success: true, data: threatLevel });
  } catch (error) {
    console.error('Error calculating threat level:', error);
    res.status(500).json({ success: false, message: 'Failed to calculate threat level' });
  }
});

// GET /api/threats/advisories
router.get('/advisories', async (req: Request, res: Response) => {
  try {
    const advisories = await threatsService.getGovernmentAdvisories();
    res.json({ success: true, data: advisories });
  } catch (error) {
    console.error('Error fetching advisories:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch advisories' });
  }
});

// GET /api/threats/vendors
router.get('/vendors', async (req: Request, res: Response) => {
  try {
    const vendors = await threatsService.getVendorAlerts();
    res.json({ success: true, data: vendors });
  } catch (error) {
    console.error('Error fetching vendor alerts:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch vendor alerts' });
  }
});

// GET /api/threats/stats
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const stats = await threatsService.getThreatStatistics();
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch statistics' });
  }
});

// POST /api/threats/subscribe
router.post(
  '/subscribe',
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const { email, severityThreshold } = req.body;
      if (!email || !severityThreshold) {
        return res.status(400).json({
          success: false,
          message: 'Email and severity threshold are required',
        });
      }
      const subscription = await threatsService.subscribeToAlerts(email, severityThreshold);
      res.status(201).json({
        success: true,
        message: 'Successfully subscribed to threat alerts',
        data: subscription,
      });
    } catch (error) {
      console.error('Error subscribing to alerts:', error);
      res.status(500).json({ success: false, message: 'Failed to subscribe to alerts' });
    }
  }
);

// POST /api/threats/seed
router.post('/seed', async (req: Request, res: Response) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({
        success: false,
        message: 'Seeding not allowed in production',
      });
    }
    await threatsService.seedSampleThreats();
    res.json({
      success: true,
      message: 'Sample threats seeded successfully',
    });
  } catch (error) {
    console.error('Error seeding threats:', error);
    res.status(500).json({ success: false, message: 'Failed to seed threats' });
  }
});

export default router;
