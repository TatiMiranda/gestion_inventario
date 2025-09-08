const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../services/db.service"); // tu conexión MySQL

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, direccion, contrasena, rol } = req.body;

    if (!nombre || !apellido || !email || !contrasena || !rol) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // Verificar si ya existe el usuario
    const [userExists] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (userExists.length > 0) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Insertar en la BD
    const [result] = await db.query(
      "INSERT INTO usuarios (nombre, apellido, email, telefono, direccion, contrasena, rol) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nombre, apellido, email, telefono, direccion, hashedPassword, rol]
    );

    res.status(201).json({ message: "Usuario registrado exitosamente", userId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    if (!email || !contrasena) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    // Buscar usuario
    const [users] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const usuario = users[0];

    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
};
