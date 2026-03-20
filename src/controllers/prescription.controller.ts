import { Response } from 'express';
import { prisma } from '../app';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getPrescriptions = async (req: AuthRequest, res: Response) => {
  try {
    const { patientId } = req.params;
    const prescriptions = await prisma.prescription.findMany({
      where: { patientId },
      include: { doctor: { include: { user: true } } }
    });
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createPrescription = async (req: AuthRequest, res: Response) => {
  try {
    const { patientId, medication, dosage, instructions, duration } = req.body;
    const { userId } = req.user!;
    
    const doctor = await prisma.doctor.findUnique({ where: { userId } });
    if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });

    const prescription = await prisma.prescription.create({
      data: { patientId, doctorId: doctor.id, medication, dosage, instructions, duration }
    });
    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updatePrescriptionStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const prescription = await prisma.prescription.update({
      where: { id },
      data: { status }
    });
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
