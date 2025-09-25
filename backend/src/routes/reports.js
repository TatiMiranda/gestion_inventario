import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../middlewares/auth.js';

const router = Router();
const prisma = new PrismaClient();

// Inventario total
router.get('/inventory', auth, async (req, res) => {
  const items = await prisma.item.findMany({
    include: { assignments: true }
  });
  res.json(items);
});

// Equipos asignados por agentekl
router.get('/assigned/:userId', auth, async (req, res) => {
  const { userId } = req.params;
  const assigned = await prisma.assignment.findMany({
    where: { userId: parseInt(userId), returnedAt: null },
    include: { item: true }
  });
  res.json(assigned);
});

// Equipos disponibles
router.get('/available', auth, async (req, res) => {
  const items = await prisma.item.findMany({
    where: { status: 'ACTIVE' }
  });
  res.json(items);
});

export default router;
