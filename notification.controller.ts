import { Response } from 'express';
import { prisma } from '../app';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user!;
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.user!;
    
    const notif = await prisma.notification.findUnique({ where: { id } });
    if (!notif || notif.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await prisma.notification.update({
      where: { id },
      data: { isRead: true }
    });
    res.json({ message: 'Notification read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
