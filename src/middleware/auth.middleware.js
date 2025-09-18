const jwt = require("jsonwebtoken");

// Middleware para verificar si el usuario está autenticado
exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // formato: Bearer <token>

  if (!token) {
    return res.status(403).json({ message: "No se proporcionó un token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardamos los datos del usuario en la request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
};

// Middleware para verificar rol
exports.isAdmin = (req, res, next) => {
  if (req.user.rol !== "ADMIN") {
    return res.status(403).json({ message: "Requiere rol de ADMIN." });
  }
  next();
};

exports.isUser = (req, res, next) => {
  if (req.user.rol !== "USER") {
    return res.status(403).json({ message: "Requiere rol de USER." });
  }
  next();
};
