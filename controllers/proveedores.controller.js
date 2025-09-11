// controllers/proveedores.controller.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los proveedores
exports.findAll = async (req, res) => {
  try {
    const proveedores = await prisma.proveedores.findMany({
      include: {
        equipo: true,
        stock: true,
      },
    });
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener proveedores", error });
  }
};

// Obtener un proveedor por ID
exports.findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const proveedor = await prisma.proveedores.findUnique({
      where: { id_proveedor: Number(id) },
      include: {
        equipo: true,
        stock: true,
      },
    });
    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener proveedor", error });
  }
};

// Crear un proveedor
exports.create = async (req, res) => {
  const { nombre, id_equipo, id_stock } = req.body;
  try {
    const nuevoProveedor = await prisma.proveedores.create({
      data: {
        nombre,
        id_equipo: Number(id_equipo),
        id_stock: Number(id_stock),
      },
    });
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    res.status(500).json({ message: "Error al crear proveedor", error });
  }
};

// Actualizar un proveedor
exports.update = async (req, res) => {
  const { id } = req.params;
  const { nombre, id_equipo, id_stock } = req.body;
  try {
    const proveedorActualizado = await prisma.proveedores.update({
      where: { id_proveedor: Number(id) },
      data: {
        nombre,
        id_equipo: Number(id_equipo),
        id_stock: Number(id_stock),
      },
    });
    res.json(proveedorActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar proveedor", error });
  }
};

// Eliminar un proveedor
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.proveedores.delete({
      where: { id_proveedor: Number(id) },
    });
    res.json({ message: "Proveedor eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar proveedor", error });
  }
};
