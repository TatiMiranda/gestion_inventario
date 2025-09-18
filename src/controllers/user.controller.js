// controllers/user.controller.js
exports.getAll = (req, res) => {
  res.json({ message: "📌 Listar todos los usuarios" });
};

exports.getById = (req, res) => {
  res.json({ message: `📌 Obtener usuario con ID ${req.params.id}` });
};

exports.create = (req, res) => {
  res.json({ message: "📌 Crear un nuevo usuario" });
};

exports.update = (req, res) => {
  res.json({ message: `📌 Actualizar usuario con ID ${req.params.id}` });
};

exports.delete = (req, res) => {
  res.json({ message: `📌 Eliminar usuario con ID ${req.params.id}` });
};
