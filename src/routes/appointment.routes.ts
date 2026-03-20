import { Router } from 'express';
import { getAppointments, bookAppointment } from '../controllers/appointment.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', getAppointments);
router.post('/', bookAppointment);

export default router;
