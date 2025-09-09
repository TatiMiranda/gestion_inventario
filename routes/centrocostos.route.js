const express = require("express");
const router = express.Router();
const centroCostosController = require("../controllers/centrocostos.controller");

// 📍 Obtener todos los centros de costos
router.get("/", centroCostosController.getAll);

// 📍 Obtener un centro de costos por ID
router.get("/:id", centroCostosController.getById);

// 📍 Crear un nuevo centro de costos
router.post("/", centroCostosController.create);

// 📍 Actualizar un centro de costos por ID
router.put("/:id", centroCostosController.update);

// 📍 Eliminar un centro de costos por ID
router.delete("/:id", centroCostosController.delete);

module.exports = router;
