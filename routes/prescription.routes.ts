import { Router } from 'express';
import { getPrescriptions, createPrescription, updatePrescriptionStatus } from '../controllers/prescription.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/patient/:patientId', authorize(['DOCTOR', 'ADMIN', 'PATIENT']), getPrescriptions);
router.post('/', authorize(['DOCTOR']), createPrescription);
router.put('/:id/status', authorize(['DOCTOR', 'ADMIN']), updatePrescriptionStatus);

export default router;
