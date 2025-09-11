// controllers/seguimiento.controller.js
const prisma = require('../config/db');

// Crear un nuevo movimiento de seguimiento
exports.create = async (req, res) => {
  try {
    const { id_equipo, cantidad, tipo_movimiento, id_sede_origen, id_sede_destino } = req.body;

    if (!id_equipo || !cantidad || !tipo_movimiento) {
      return res.status(400).json({ message: "id_equipo, cantidad y tipo_movimiento son obligatorios" });
    }

    const movimiento = await prisma.seguimiento.create({
      data: {
        id_equipo,
        cantidad,
        tipo_movimiento,
        id_sede_origen,
        id_sede_destino,
      },
    });

    res.status(201).json(movimiento);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el movimiento", error: error.message });
  }
};

// Obtener todos los movimientos
exports.getAll = async (req, res) => {
  try {
    const movimientos = await prisma.seguimiento.findMany({
      include: {
        equipo: true,
        sede_origen: true,
        sede_destino: true,
      },
    });
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener movimientos", error: error.message });
  }
};

// Obtener un movimiento por ID
exports.getById = async (req, res) => {
  try {
    const movimiento = await prisma.seguimiento.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!movimiento) {
      return res.status(404).json({ message: `No se encontró movimiento con id ${req.params.id}` });
    }

    res.json(movimiento);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el movimiento", error: error.message });
  }
};

// Actualizar un movimiento por ID
exports.update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { id_equipo, cantidad, tipo_movimiento, id_sede_origen, id_sede_destino } = req.body;

    const movimiento = await prisma.seguimiento.update({
      where: { id },
      data: { id_equipo, cantidad, tipo_movimiento, id_sede_origen, id_sede_destino },
    });

    res.json(movimiento);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: `No se encontró movimiento con id ${req.params.id}` });
    }
    res.status(500).json({ message: "Error al actualizar el movimiento", error: error.message });
  }
};

// Eliminar un movimiento por ID
exports.delete = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.seguimiento.delete({
      where: { id },
    });

    res.json({ message: `Movimiento con id ${req.params.id} eliminado correctamente` });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: `No se encontró movimiento con id ${req.params.id}` });
    }
    res.status(500).json({ message: "Error al eliminar el movimiento", error: error.message });
  }
};
