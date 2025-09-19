const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Listar todas las categorías
exports.getAll = async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany();
    res.render("categoria", { categorias }); // Renderiza vista
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener categorías");
  }
};

// Crear una nueva categoría
exports.create = async (req, res) => {
  try {
    const { nombre } = req.body;
    await prisma.categoria.create({
      data: { nombre }
    });
    res.redirect("/categorias"); // Redirige después de crear
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear categoría");
  }
};
