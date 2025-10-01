import { Router } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// 📌 Crear equipo con stock inicial
router.post("/", async (req, res) => {
  const { nombre, codigo, estado, categoria, sede, piso } = req.body;

  try {
    let categoriaNombre = categoria || "Otro";

    if (!categoria) {
      if (nombre.toLowerCase().includes("gabinete")) categoriaNombre = "Gabinete";
      else if (nombre.toLowerCase().includes("monitor")) categoriaNombre = "Monitor";
      else if (nombre.toLowerCase().includes("diadema")) categoriaNombre = "Diadema";
    }

    let categoriaDb = await prisma.categoria.findUnique({
      where: { nombre: categoriaNombre },
    });

    if (!categoriaDb) {
      categoriaDb = await prisma.categoria.create({
        data: { nombre: categoriaNombre },
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const createdEquipo = await tx.equipo.create({
        data: {
          nombre,
          codigo,
          estado: estado || "Activo",
          sede: sede || "Sin sede",
          piso: piso || "Sin piso",
          categoriaId: categoriaDb.id,
        },
      });

      await tx.stock.create({
        data: {
          equipoId: createdEquipo.id,
          cantidad: 1,
        },
      });

      return await tx.equipo.findUnique({
        where: { id: createdEquipo.id },
        include: { categoria: true, stock: true },
      });
    });

    return res.status(201).json({
      message: `✅ Equipo "${result.nombre}" registrado en categoría "${categoriaDb.nombre}" en sede "${result.sede}" - ${result.piso} con stock inicial.`,
      equipo: result,
    });
  } catch (error) {
    console.error(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res
        .status(400)
        .json({ error: `Ya existe un equipo con el código "${req.body.codigo}".` });
    }

    return res.status(500).json({ error: "❌ Error al registrar equipo." });
  }
});

// 📌 Actualizar datos del equipo
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, codigo, estado, sede, piso } = req.body;

  try {
    const updatedEquipo = await prisma.equipo.update({
      where: { id: Number(id) },
      data: {
        ...(nombre && { nombre }),
        ...(codigo && { codigo }),
        ...(estado && { estado }),
        ...(sede && { sede }),
        ...(piso && { piso }),
      },
      include: { categoria: true, stock: true },
    });

    return res.json({
      message: `✏️ Equipo "${updatedEquipo.nombre}" actualizado correctamente.`,
      equipo: updatedEquipo,
    });
  } catch (error) {
    console.error("❌ Error al actualizar equipo:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({ error: "❌ Equipo no encontrado." });
    }

    return res.status(500).json({ error: "❌ Error al actualizar equipo." });
  }
});

// 📌 Obtener todos los equipos
router.get("/", async (req, res) => {
  try {
    const equipos = await prisma.equipo.findMany({
      include: { categoria: true, stock: true },
    });
    res.json(equipos);
  } catch (error) {
    console.error("❌ Error al obtener equipos:", error);
    res.status(500).json({ error: "❌ Error al obtener equipos." });
  }
});

// 📌 Eliminar equipo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.stock.deleteMany({ where: { equipoId: Number(id) } });
    await prisma.equipo.delete({ where: { id: Number(id) } });

    return res.json({ message: "🗑️ Equipo eliminado correctamente." });
  } catch (error) {
    console.error("❌ Error al eliminar equipo:", error);
    return res.status(500).json({ error: "❌ Error al eliminar equipo." });
  }
});

// ✅ Exportación por defecto
export default router;
