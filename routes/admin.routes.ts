import { Router } from 'express';
import { getSystemAnalytics } from '../controllers/admin.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);
router.use(authorize(['ADMIN']));

router.get('/analytics', getSystemAnalytics);

export default router;
