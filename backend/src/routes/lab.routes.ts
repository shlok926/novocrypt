import { Router } from 'express';
import { labController } from '../controllers/lab.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createLabSessionSchema } from '../schemas/lab.schema';

const router = Router();

router.post('/sessions', requireAuth, validate(createLabSessionSchema), labController.create);
router.get('/sessions', requireAuth, labController.history);
router.get('/sessions/:id', requireAuth, labController.getById);

export default router;
