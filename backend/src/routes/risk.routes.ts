import { Router } from 'express';
import { riskController } from '../controllers/risk.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { calculateRiskSchema } from '../schemas/risk.schema';

const router = Router();

router.post('/calculate', requireAuth, validate(calculateRiskSchema), riskController.calculate);
router.get('/history', requireAuth, riskController.history);
router.get('/:id', requireAuth, riskController.getById);

export default router;
