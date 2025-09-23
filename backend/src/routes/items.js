const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middlewares/auth');

const prisma = new PrismaClient();

router.get('/', auth, async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

router.post('/', auth, async (req, res) => {
  const { name, type, serial } = req.body;
  const item = await prisma.item.create({ data: { name, type, serial }});
  res.json(item);
});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { name, type, status } = req.body;
  const item = await prisma.item.update({
    where: { id: parseInt(id) },
    data: { name, type, status }
  });
  res.json(item);
});

router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  await prisma.item.delete({ where: { id: parseInt(id) }});
  res.json({ message: 'Item eliminado' });
});


module.exports = router;
