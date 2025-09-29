import { Router } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// 📌 Crear equipo con stock inicial
router.post("/", async (req, res) => {
  const { nombre, codigo, estado, categoria, sede } = req.body; // 👈 ahora recibimos sede

  try {
    // 🔹 Si el usuario eligió categoría desde el frontend, usarla
    let categoriaNombre = categoria || "Otro";

    // 🔹 Si no viene categoría explícita, detectarla automáticamente
    if (!categoria) {
      if (nombre.toLowerCase().includes("gabinete")) categoriaNombre = "Gabinete";
      else if (nombre.toLowerCase().includes("monitor")) categoriaNombre = "Monitor";
      else if (nombre.toLowerCase().includes("diadema")) categoriaNombre = "Diadema";
    }

    // 🔹 Buscar o crear categoría
    let categoriaDb = await prisma.categoria.findUnique({
      where: { nombre: categoriaNombre },
    });

    if (!categoriaDb) {
      categoriaDb = await prisma.categoria.create({
        data: { nombre: categoriaNombre },
      });
    }

    // 📌 Crear equipo y stock inicial dentro de una transacción
    const result = await prisma.$transaction(async (tx) => {
      // crear equipo con sede
      const createdEquipo = await tx.equipo.create({
        data: {
          nombre,
          codigo,
          estado: estado || "Activo",
          sede: sede || "Sin sede", // 👈 guardar sede
          categoriaId: categoriaDb.id,
        },
      });

      // crear stock inicial
      await tx.stock.create({
        data: {
          equipoId: createdEquipo.id,
          cantidad: 1,
        },
      });

      // 🔹 volver a consultar el equipo ya con sus relaciones
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

// 📌 Buscar equipos por sede y nombre (para módulo Seguimiento básico)
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

// 📌 Seguimiento: Buscar equipos por sede y nombre (SOLO los que tienen stock)
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

    // 🔹 Filtrar los que realmente tengan stock
    const equiposConStock = equipos.filter(
      (eq) => eq.stock && eq.stock.cantidad > 0
    );

    return res.json(equiposConStock);
  } catch (error) {
    console.error("Error en seguimiento:", error);
    return res.status(500).json({ error: "❌ Error al obtener seguimiento." });
  }
});

// 📌 Eliminar equipo por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEquipo = await prisma.equipo.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({
      message: `🗑️ Equipo "${deletedEquipo.nombre}" eliminado correctamente.`,
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

export default router;
