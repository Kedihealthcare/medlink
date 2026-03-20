import { Router } from 'express';
import { getDoctorSchedule, updateAppointmentStatus } from '../controllers/doctor.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);
router.use(authorize(['DOCTOR', 'ADMIN']));

router.get('/schedule', getDoctorSchedule);
router.put('/appointments/:id', updateAppointmentStatus);

export default router;
