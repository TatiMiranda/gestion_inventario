const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middlewares/auth');

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

module.exports = router;
