const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoria.controller");

// Listar categorías
router.get("/", categoriaController.getAll);

// Crear categoría
router.post("/", categoriaController.create);

module.exports = router;
