// controllers/centroCostos.controller.js
const prisma = require('../config/db');

// Crear y guardar un nuevo centro de costos
exports.create = async (req, res) => {
  try {
    const { nombre, id_sede, id_equipo, id_seguimiento } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const centro = await prisma.centroCostos.create({
      data: {
        nombre,
        id_sede,
        id_equipo,
        id_seguimiento,
      },
    });

    res.status(201).json(centro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear centro de costos", error: error.message });
  }
};

// Obtener todos los centros de costos
exports.findAll = async (req, res) => {
  try {
    const centros = await prisma.centroCostos.findMany({
      include: {
        sede: true,
        equipo: true,
        seguimiento: true,
      },
    });
    res.json(centros);
  } catch (error) {
    res.status(500).json({ message: "Error al recuperar centros de costos", error: error.message });
  }
};

// Encontrar un centro de costos por ID
exports.findOne = async (req, res) => {
  try {
    const centro = await prisma.centroCostos.findUnique({
      where: { id_centroCostos: parseInt(req.params.id) },
      include: { sede: true, equipo: true, seguimiento: true },
    });

    if (!centro) {
      return res.status(404).json({ message: `No se encontró centro de costos con id ${req.params.id}` });
    }

    res.json(centro);
  } catch (error) {
    res.status(500).json({ message: "Error al recuperar centro de costos", error: error.message });
  }
};

// Actualizar un centro de costos por ID
exports.update = async (req, res) => {
  try {
    const centro = await prisma.centroCostos.update({
      where: { id_centroCostos: parseInt(req.params.id) },
      data: req.body,
    });

    res.json(centro);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: `No se encontró centro de costos con id ${req.params.id}` });
    } else {
      res.status(500).json({ message: "Error al actualizar centro de costos", error: error.message });
    }
  }
};

// Eliminar un centro de costos por ID
exports.delete = async (req, res) => {
  try {
    await prisma.centroCostos.delete({
      where: { id_centroCostos: parseInt(req.params.id) },
    });
    res.json({ message: "¡El centro de costos fue eliminado exitosamente!" });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: `No se encontró centro de costos con id ${req.params.id}` });
    } else {
      res.status(500).json({ message: "Error al eliminar centro de costos", error: error.message });
    }
  }
};
