import { Router } from 'express';
import { complianceService } from '../services/compliance.service';

const router = Router();

// Get all compliance standards
router.get('/standards', async (req, res) => {
  try {
    const standards = await complianceService.getComplianceStandards();
    res.json({ success: true, data: standards });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch standards' });
  }
});

// Get specific standard
router.get('/standards/:standardId', async (req, res) => {
  try {
    const standard = await complianceService.getStandardById(req.params.standardId);
    if (!standard) {
      return res.status(404).json({ success: false, error: 'Standard not found' });
    }
    res.json({ success: true, data: standard });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch standard' });
  }
});

// Check compliance
router.post('/check', async (req, res) => {
  try {
    const { organizationName, currentAlgorithms, targetStandards, industry } = req.body;
    
    if (!organizationName || !currentAlgorithms || !targetStandards) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }
    
    const result = await complianceService.checkCompliance({
      organizationName,
      currentAlgorithms,
      targetStandards,
      industry
    });
    
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to check compliance' });
  }
});

export default router;
