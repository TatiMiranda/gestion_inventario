import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Listar todo el stock
router.get("/", async (req, res) => {
  try {
    const stocks = await prisma.stock.findMany({
      include: { equipo: true },
    });
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener stock" });
  }
});

// Crear registro de stock
router.post("/", async (req, res) => {
  const { equipoId, cantidad } = req.body;
  try {
    const stock = await prisma.stock.create({
      data: { equipoId: Number(equipoId), cantidad: Number(cantidad) },
      include: { equipo: true },
    });
    res.json(stock);
  } catch (error) {
    res.status(400).json({ error: "Error al crear registro de stock" });
  }
});

// Actualizar cantidad de stock
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;

  try {
    const stock = await prisma.stock.update({
      where: { id: Number(id) },
      data: { cantidad: Number(cantidad) },
      include: { equipo: true },
    });
    res.json(stock);
  } catch (error) {
    res.status(400).json({ error: "No se pudo actualizar el stock" });
  }
});

export default router;
