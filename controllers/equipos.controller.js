// controllers/equipos.controller.js
const prisma = require('../config/db');

// Obtener todos los equipos
exports.getAll = async (req, res) => {
  try {
    const equipos = await prisma.equipo.findMany({
      include: {
        centroCostos: true, // Si existe relación en el schema.prisma
      },
    });
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los equipos', error: error.message });
  }
};

// Obtener un equipo por ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const equipo = await prisma.equipo.findUnique({
      where: { id: parseInt(id) },
      include: { centroCostos: true },
    });

    if (!equipo) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }

    res.json(equipo);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el equipo', error: error.message });
  }
};

// Crear un nuevo equipo
exports.create = async (req, res) => {
  try {
    const { nombre, marca, modelo, serie, id_centro_costo } = req.body;

    if (!nombre || !marca || !modelo || !serie || !id_centro_costo) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const equipo = await prisma.equipo.create({
      data: {
        nombre,
        marca,
        modelo,
        serie,
        id_centro_costo: parseInt(id_centro_costo),
      },
    });

    res.status(201).json(equipo);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el equipo', error: error.message });
  }
};

// Actualizar un equipo
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, marca, modelo, serie, id_centro_costo } = req.body;

    if (!nombre || !marca || !modelo || !serie || !id_centro_costo) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const equipo = await prisma.equipo.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        marca,
        modelo,
        serie,
        id_centro_costo: parseInt(id_centro_costo),
      },
    });

    res.json(equipo);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Equipo no encontrado' });
    } else {
      res.status(500).json({ message: 'Error al actualizar el equipo', error: error.message });
    }
  }
};

// Eliminar un equipo
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.equipo.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Equipo eliminado correctamente' });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Equipo no encontrado' });
    } else {
      res.status(500).json({ message: 'Error al eliminar el equipo', error: error.message });
    }
  }
};
