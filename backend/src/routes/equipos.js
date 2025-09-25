import { Router } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// 📌 Crear equipo
router.post("/", async (req, res) => {
  const { nombre, codigo } = req.body;

  try {
    // 🔹 Determinar categoría automáticamente según el nombre
    let categoriaNombre = "Otro";
    if (nombre.toLowerCase().includes("gabinete")) {
      categoriaNombre = "Gabinete";
    } else if (nombre.toLowerCase().includes("monitor")) {
      categoriaNombre = "Monitor";
    } else if (nombre.toLowerCase().includes("diadema")) {
      categoriaNombre = "Diadema";
    }

    // 🔹 Buscar la categoría en BD o crearla si no existe
    let categoria = await prisma.categoria.findUnique({
      where: { nombre: categoriaNombre },
    });

    if (!categoria) {
      categoria = await prisma.categoria.create({
        data: { nombre: categoriaNombre },
      });
    }

    // 🔹 Aquí va tu bloque de creación del equipo con stock
    const equipo = await prisma.equipo.create({
      data: {
        nombre,
        codigo,
        estado: estado || "Activo", 
        categoriaId: categoria.id, // Relación con Categoria
        stock: {
          create: { cantidad: 1 }, // Se crea stock inicial automáticamente
        },
      },
      include: { categoria: true, stock: true },
    });

    return res.status(201).json({
      message: `✅ Equipo "${equipo.nombre}" registrado en categoría "${categoria.nombre}" con stock inicial de ${equipo.stock.cantidad}.`,
      equipo,
    });
  } catch (error) {
    console.error(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      // ⚠️ Código duplicado
      return res
        .status(400)
        .json({ error: `Ya existe un equipo con el código "${req.body.codigo}".` });
    }

    return res.status(500).json({ error: "❌ Error el equipo ya se encuentra registrado." });
  }
});

export default router;
