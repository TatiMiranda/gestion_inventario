const express = require("express");
const router = express.Router();
const seguimientoController = require("../controllers/seguimiento.controller");

// 📍 Obtener todos los seguimientos
router.get("/", seguimientoController.getAll);

// 📍 Obtener un seguimiento por ID
router.get("/:id", seguimientoController.getById);

// 📍 Crear un nuevo seguimiento
router.post("/", seguimientoController.create);

// 📍 Actualizar un seguimiento por ID
router.put("/:id", seguimientoController.update);

// 📍 Eliminar un seguimiento por ID
router.delete("/:id", seguimientoController.delete);

module.exports = router;
