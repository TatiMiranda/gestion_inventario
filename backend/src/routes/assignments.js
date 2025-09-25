import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../middlewares/auth.js';

const router = Router();

const prisma = new PrismaClient();

router.post('/', auth, async (req, res) => {
  const { userId, itemId } = req.body;
  const assignment = await prisma.assignment.create({
    data: { userId, itemId }
  });
  res.json(assignment);
});

router.post('/return', auth, async (req, res) => {
  const { assignmentId } = req.body;
  const assignment = await prisma.assignment.update({
    where: { id: assignmentId },
    data: { returnedAt: new Date() }
  });
  res.json(assignment);
});

export default router;
