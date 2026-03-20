import { Response } from 'express';
import { prisma } from '../app';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getSystemAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalPatients = await prisma.patient.count();
    const totalDoctors = await prisma.doctor.count();
    
    const totalAppointments = await prisma.appointment.count();
    const scheduledAppointments = await prisma.appointment.count({ where: { status: 'SCHEDULED' } });
    const completedAppointments = await prisma.appointment.count({ where: { status: 'COMPLETED' } });
    const cancelledAppointments = await prisma.appointment.count({ where: { status: 'CANCELLED' } });

    res.json({
      users: { total: totalUsers, patients: totalPatients, doctors: totalDoctors },
      appointments: { total: totalAppointments, scheduled: scheduledAppointments, completed: completedAppointments, cancelled: cancelledAppointments }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
