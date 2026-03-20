import { Response } from 'express';
import { prisma } from '../app';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getMedicalRecords = async (req: AuthRequest, res: Response) => {
  try {
    const { patientId } = req.params;
    const records = await prisma.medicalRecord.findMany({
      where: { patientId },
      include: { doctor: { include: { user: true } } }
    });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createMedicalRecord = async (req: AuthRequest, res: Response) => {
  try {
    const { patientId, diagnosis, treatment, notes } = req.body;
    const { userId } = req.user!;
    
    const doctor = await prisma.doctor.findUnique({ where: { userId } });
    if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });

    const record = await prisma.medicalRecord.create({
      data: { patientId, doctorId: doctor.id, diagnosis, treatment, notes }
    });
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateMedicalRecord = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { diagnosis, treatment, notes } = req.body;
    
    const record = await prisma.medicalRecord.update({
      where: { id },
      data: { diagnosis, treatment, notes }
    });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
