exports.getAll = (req, res) => {
  res.json({ message: "📌 Listar todas las sedes" });
};

exports.getById = (req, res) => {
  res.json({ message: `📌 Obtener sede con ID ${req.params.id}` });
};

exports.create = (req, res) => {
  res.json({ message: "📌 Crear una nueva sede" });
};

exports.update = (req, res) => {
  res.json({ message: `📌 Actualizar sede con ID ${req.params.id}` });
};

exports.delete = (req, res) => {
  res.json({ message: `📌 Eliminar sede con ID ${req.params.id}` });
};
