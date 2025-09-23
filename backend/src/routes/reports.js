const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middlewares/auth');
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

module.exports = router;
