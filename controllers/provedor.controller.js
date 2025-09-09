// controllers/proveedores.controller.js
const prisma = require('../config/db');

// Crear y guardar un nuevo proveedor
exports.create = async (req, res) => {
  try {
    const { nombre, equipos_proveidos, stock_proveido } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const proveedor = await prisma.proveedor.create({
      data: {
        nombre,
        equipos_proveidos,
        stock_proveido,
      },
    });

    res.status(201).json(proveedor);
  } catch (error) {
    res.status(500).json({ message: "Error al crear proveedor", error: error.message });
  }
};

// Obtener todos los proveedores
exports.findAll = async (req, res) => {
  try {
    const proveedores = await prisma.proveedor.findMany({
      include: {
        equipos: true,   // si en tu schema existe relación con equipos
        stock: true,     // si en tu schema existe relación con stock
      },
    });
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ message: "Error al recuperar proveedores", error: error.message });
  }
};

// Encontrar un proveedor por su ID
exports.findOne = async (req, res) => {
  try {
    const proveedor = await prisma.proveedor.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { equipos: true, stock: true },
    });

    if (!proveedor) {
      return res.status(404).json({ message: `No se encontró proveedor con id ${req.params.id}` });
    }

    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ message: "Error al recuperar proveedor", error: error.message });
  }
};

// Actualizar un proveedor por su ID
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, equipos_proveidos, stock_proveido } = req.body;

    const proveedor = await prisma.proveedor.update({
      where: { id: parseInt(id) },
      data: { nombre, equipos_proveidos, stock_proveido },
    });

    res.json(proveedor);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: `No se encontró proveedor con id ${req.params.id}` });
    } else {
      res.status(500).json({ message: "Error al actualizar proveedor", error: error.message });
    }
  }
};

// Eliminar un proveedor por su ID
exports.delete = async (req, res) => {
  try {
    await prisma.proveedor.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.json({ message: "¡El proveedor fue eliminado exitosamente!" });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: `No se encontró proveedor con id ${req.params.id}` });
    } else {
      res.status(500).json({ message: "Error al eliminar proveedor", error: error.message });
    }
  }
};
