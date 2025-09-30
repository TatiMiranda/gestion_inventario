import { Router } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// 📌 Crear equipo con stock inicial
router.post("/", async (req, res) => {
  const { nombre, codigo, estado, categoria, sede } = req.body;

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
          categoriaId: categoriaDb.id,
        },
      });

      await tx.stock.create({
        data: {
          equipoId: createdEquipo.id,
          cantidad: 1,
        },
      });

      const equipoConTodo = await tx.equipo.findUnique({
        where: { id: createdEquipo.id },
        include: { categoria: true, stock: true },
      });

      return equipoConTodo;
    });

    return res.status(201).json({
      message: `✅ Equipo "${result.nombre}" registrado en categoría "${categoriaDb.nombre}" con sede "${result.sede}" y stock inicial.`,
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

// 📌 Listar todos los equipos
router.get("/", async (req, res) => {
  try {
    const equipos = await prisma.equipo.findMany({
      include: { categoria: true, stock: true },
    });
    return res.json(equipos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "❌ Error al obtener equipos." });
  }
});

// 📌 Buscar equipos por sede y nombre
router.get("/buscar", async (req, res) => {
  const { sede, nombre } = req.query;

  try {
    const equipos = await prisma.equipo.findMany({
      where: {
        AND: [
          sede ? { sede: { equals: sede } } : {},
          nombre ? { nombre: { contains: nombre, mode: "insensitive" } } : {},
        ],
      },
      include: { categoria: true, stock: true },
    });

    return res.json(equipos);
  } catch (error) {
    console.error("Error al buscar equipos:", error);
    return res.status(500).json({ error: "❌ Error al buscar equipos." });
  }
});

// 📌 Seguimiento: Buscar solo equipos con stock
router.get("/seguimiento", async (req, res) => {
  const { sede, nombre } = req.query;

  try {
    const equipos = await prisma.equipo.findMany({
      where: {
        AND: [
          sede ? { sede: { equals: sede } } : {},
          nombre ? { nombre: { contains: nombre, mode: "insensitive" } } : {},
        ],
      },
      include: { categoria: true, stock: true },
    });

    const equiposConStock = equipos.filter(
      (eq) => eq.stock && eq.stock.cantidad > 0
    );

    return res.json(equiposConStock);
  } catch (error) {
    console.error("Error en seguimiento:", error);
    return res.status(500).json({ error: "❌ Error al obtener seguimiento." });
  }
});

// 📌 Eliminar equipo y su stock
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Eliminar el stock primero
    await prisma.stock.deleteMany({
      where: { equipoId: Number(id) },
    });

    // 2. Eliminar el equipo
    const deletedEquipo = await prisma.equipo.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({
      message: `🗑️ Equipo "${deletedEquipo.nombre}" y su stock eliminado correctamente.`,
      deletedEquipo,
    });
  } catch (error) {
    console.error(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({ error: "❌ Equipo no encontrado." });
    }

    return res.status(500).json({ error: "❌ Error al eliminar equipo." });
  }
});

// 📌 Actualizar datos del equipo
router.put("/equipo/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, codigo, estado, sede } = req.body;

  try {
    const updatedEquipo = await prisma.equipo.update({
      where: { id: Number(id) },
      data: {
        ...(nombre && { nombre }),
        ...(codigo && { codigo }),
        ...(estado && { estado }),
        ...(sede && { sede }),
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

// 📌 Cambiar estado del equipo
router.put("/:id/estado", async (req, res) => {
  const { id } = req.params;
  let { estado } = req.body;

  if (estado === true) estado = "Activo";
  if (estado === false) estado = "Inactivo";

  try {
    const updatedEquipo = await prisma.equipo.update({
      where: { id: Number(id) },
      data: { estado },
    });

    return res.json({
      message: `🔄 Estado actualizado a "${estado}" para el equipo "${updatedEquipo.nombre}".`,
      equipo: updatedEquipo,
    });
  } catch (error) {
    console.error("❌ Error al cambiar estado del equipo:", error);
    return res.status(500).json({ error: "❌ Error al cambiar estado del equipo." });
  }
});

export default router;
