// controllers/sedes.controller.js
const prisma = require('../config/db');

// Crear y guardar una nueva sede
exports.create = async (req, res) => {
  try {
    const { nombre, direccion } = req.body;

    if (!nombre || !direccion) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const sede = await prisma.sede.create({
      data: { nombre, direccion },
    });

    res.status(201).json(sede);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la sede", error: error.message });
  }
};

// Obtener todas las sedes
exports.findAll = async (req, res) => {
  try {
    const sedes = await prisma.sede.findMany({
      include: {
        equipos: true, // si tienes relación en el schema
      },
    });
    res.json(sedes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las sedes", error: error.message });
  }
};

// Obtener una sede por ID
exports.findOne = async (req, res) => {
  try {
    const sede = await prisma.sede.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { equipos: true },
    });

    if (!sede) {
      return res.status(404).json({ message: `No se encontró sede con id ${req.params.id}` });
    }

    res.json(sede);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la sede", error: error.message });
  }
};

// Actualizar una sede
exports.update = async (req, res) => {
  try {
    const { nombre, direccion } = req.body;
    const { id } = req.params;

    if (!nombre || !direccion) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const sede = await prisma.sede.update({
      where: { id: parseInt(id) },
      data: { nombre, direccion },
    });

    res.json(sede);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: `No se encontró sede con id ${req.params.id}` });
    } else {
      res.status(500).json({ message: "Error al actualizar la sede", error: error.message });
    }
  }
};

// Eliminar una sede
exports.delete = async (req, res) => {
  try {
    await prisma.sede.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.json({ message: "¡La sede fue eliminada exitosamente!" });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: `No se encontró sede con id ${req.params.id}` });
    } else {
      res.status(500).json({ message: "Error al eliminar la sede", error: error.message });
    }
  }
};
