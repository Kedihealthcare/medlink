import { Response } from 'express';
import { prisma } from '../app';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getAppointments = async (req: AuthRequest, res: Response) => {
  try {
    const { userId, role } = req.user!;
    let appointments;

    if (role === 'PATIENT') {
      const patient = await prisma.patient.findUnique({ where: { userId } });
      if (!patient) return res.status(404).json({ message: 'Patient profile not found' });
      
      appointments = await prisma.appointment.findMany({
        where: { patientId: patient.id },
        include: { doctor: { include: { user: true } } }
      });
    } else if (role === 'DOCTOR') {
      const doctor = await prisma.doctor.findUnique({ where: { userId } });
      if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });

      appointments = await prisma.appointment.findMany({
        where: { doctorId: doctor.id },
        include: { patient: { include: { user: true } } }
      });
    } else {
      appointments = await prisma.appointment.findMany({
        include: { doctor: { include: { user: true } }, patient: { include: { user: true } } }
      });
    }

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const bookAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const { doctorId, dateTime, notes } = req.body;
    const { userId } = req.user!;

    let patient = await prisma.patient.findUnique({ where: { userId } });
    if (!patient) {
      // Auto-create patient profile for demonstration
      patient = await prisma.patient.create({
        data: { userId, dateOfBirth: new Date() }
      });
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        doctorId,
        dateTime: new Date(dateTime),
        notes
      }
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
