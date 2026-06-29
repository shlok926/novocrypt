import express, { Router } from 'express';
import { getThreatIntelligence, getThreatById, getThreatStatistics, searchThreats } from '../services/threat.service';

const router = Router();

// GET /api/threats - Get all threats with optional filtering
router.get('/', async (req, res) => {
  try {
    const { severity, category, limit } = req.query;
    const threats = await getThreatIntelligence({
      severity: severity as 'critical' | 'high' | 'medium' | 'low' | undefined,
      category: category as string | undefined,
      limit: limit ? parseInt(limit as string) : undefined
    });

    res.json({
      success: true,
      data: threats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch threats', details: error }
    });
  }
});

// GET /api/threats/statistics - Get threat statistics
router.get('/statistics', async (req, res) => {
  try {
    const stats = await getThreatStatistics();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch statistics', details: error }
    });
  }
});

// GET /api/threats/search - Search threats
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string') {
      return res.status(400).json({
        success: false,
        error: { message: 'Search query required' }
      });
    }

    const results = await searchThreats(q);
    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Search failed', details: error }
    });
  }
});

// GET /api/threats/:id - Get threat by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const threat = await getThreatById(id);

    if (!threat) {
      return res.status(404).json({
        success: false,
        error: { message: 'Threat not found' }
      });
    }

    res.json({
      success: true,
      data: threat
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch threat', details: error }
    });
  }
});

export default router;
