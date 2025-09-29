import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// 📌 Obtener stock con información de equipos, categoría y sede
router.get("/", async (req, res) => {
  try {
    const stock = await prisma.stock.findMany({
      include: {
        equipo: {
          include: {
            categoria: true, // 👈 Incluimos la categoría
          },
        },
      },
    });
    res.json(stock);
  } catch (err) {
    console.error("❌ Error al obtener stock:", err);
    res.status(500).json({ error: "Error al obtener stock" });
  }
});

// 📌 Crear registro de stock manualmente
router.post("/", async (req, res) => {
  const { equipoId, cantidad } = req.body;
  try {
    const stock = await prisma.stock.create({
      data: {
        equipoId: Number(equipoId),
        cantidad: Number(cantidad),
      },
      include: {
        equipo: {
          include: {
            categoria: true, // 👈 También aquí
          },
        },
      },
    });
    res.json(stock);
  } catch (error) {
    console.error("❌ Error al crear registro de stock:", error);
    res.status(400).json({ error: "Error al crear registro de stock" });
  }
});

// 📌 Actualizar cantidad de stock
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;

  try {
    const stock = await prisma.stock.update({
      where: { id: Number(id) },
      data: { cantidad: Number(cantidad) },
      include: {
        equipo: {
          include: {
            categoria: true, // 👈 También al actualizar
          },
        },
      },
    });
    res.json(stock);
  } catch (error) {
    console.error("❌ Error al actualizar stock:", error);
    res.status(400).json({ error: "No se pudo actualizar el stock" });
  }
});

// 📌 Actualizar estado del equipo desde el stock
router.put("/:id/estado", async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const equipo = await prisma.equipo.update({
      where: { id: Number(id) },
      data: { estado },
      include: {
        categoria: true,
      },
    });
    res.json(equipo);
  } catch (error) {
    console.error("❌ Error al actualizar estado:", error);
    res.status(400).json({ error: "No se pudo actualizar el estado del equipo" });
  }
});

export default router;
