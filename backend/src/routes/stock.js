import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// 📌 Obtener stock con equipo y categoría
router.get("/", async (req, res) => {
  try {
    const stock = await prisma.stock.findMany({
      include: { equipo: { include: { categoria: true } } },
    });
    res.json(stock);
  } catch (err) {
    console.error("❌ Error al obtener stock:", err);
    res.status(500).json({ error: "Error al obtener stock" });
  }
});

// 📌 Crear stock manual
router.post("/", async (req, res) => {
  const { equipoId, cantidad } = req.body;
  try {
    const stock = await prisma.stock.create({
      data: { equipoId: Number(equipoId), cantidad: Number(cantidad) },
      include: { equipo: { include: { categoria: true } } },
    });
    res.json(stock);
  } catch (error) {
    console.error("❌ Error al crear stock:", error);
    res.status(400).json({ error: "Error al crear registro de stock" });
  }
});

// 📌 Editar cantidad de stock
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;

  try {
    const stock = await prisma.stock.update({
      where: { id: Number(id) },
      data: { cantidad: Number(cantidad) },
      include: { equipo: { include: { categoria: true } } },
    });
    res.json(stock);
  } catch (error) {
    console.error("❌ Error al actualizar stock:", error);
    res.status(400).json({ error: "No se pudo actualizar el stock" });
  }
});

// 📌 Eliminar stock por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStock = await prisma.stock.delete({
      where: { id: Number(id) },
    });
    res.json({
      message: ` Stock con ID ${id} eliminado correctamente.`,
      deletedStock,
    });
  } catch (error) {
    console.error("❌ Error al eliminar stock:", error);
    res.status(400).json({ error: "No se pudo eliminar el stock" });
  }
});

export default router;
