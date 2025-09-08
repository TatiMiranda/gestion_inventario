// controllers/usuarios.controller.js
const prisma = require('../config/db');
const bcrypt = require('bcryptjs');

// Crear y guardar un nuevo usuario
exports.create = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, direccion, contrasena, rol } = req.body;

    if (!nombre || !apellido || !email || !contrasena || !rol) {
      return res.status(400).json({ message: "Los campos nombre, apellido, email, contraseña y rol son obligatorios" });
    }

    // Verificar si ya existe el email
    const userExists = await prisma.usuario.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Hashear contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        email,
        telefono,
        direccion,
        contrasena: hashedPassword,
        rol,
      },
    });

    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario", error: error.message });
  }
};

// Obtener todos los usuarios
exports.findAll = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error: error.message });
  }
};

// Obtener un usuario por ID
exports.findOne = async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: parseInt(req.params.id) },
    });

    if (!usuario) {
      return res.status(404).json({ message: `No se encontró usuario con id ${req.params.id}` });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error: error.message });
  }
};

// Actualizar un usuario por ID
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, direccion, contrasena, rol } = req.body;

    const dataToUpdate = { nombre, apellido, email, telefono, direccion, rol };

    // Si envía contraseña nueva, la encriptamos
    if (contrasena) {
      dataToUpdate.contrasena = await bcrypt.hash(contrasena, 10);
    }

    const usuario = await prisma.usuario.update({
      where: { id_usuario: parseInt(id) },
      data: dataToUpdate,
    });

    res.json(usuario);
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: `No se encontró usuario con id ${req.params.id}` });
    } else {
      res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
    }
  }
};

// Eliminar un usuario por ID
exports.delete = async (req, res) => {
  try {
    await prisma.usuario.delete({
      where: { id_usuario: parseInt(req.params.id) },
    });

    res.json({ message: "¡El usuario fue eliminado exitosamente!" });
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: `No se encontró usuario con id ${req.params.id}` });
    } else {
      res.status(500).json({ message: "Error al eliminar el usuario", error: error.message });
    }
  }
};
