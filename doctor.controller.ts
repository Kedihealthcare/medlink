import { Response } from 'express';
import { prisma } from '../app';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getDoctorSchedule = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user!;
    const doctor = await prisma.doctor.findUnique({ where: { userId } });
    if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });

    const schedule = await prisma.availability.findMany({
      where: { doctorId: doctor.id }
    });
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateAppointmentStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status, notes }
    });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
