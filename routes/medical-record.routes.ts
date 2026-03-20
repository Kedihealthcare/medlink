import { Router } from 'express';
import { getMedicalRecords, createMedicalRecord, updateMedicalRecord } from '../controllers/medical-record.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/patient/:patientId', authorize(['DOCTOR', 'ADMIN', 'PATIENT']), getMedicalRecords);
router.post('/', authorize(['DOCTOR']), createMedicalRecord);
router.put('/:id', authorize(['DOCTOR']), updateMedicalRecord);

export default router;
