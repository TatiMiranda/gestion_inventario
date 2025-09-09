const express = require("express");
const router = express.Router();
const equiposController = require("../controllers/equipos.controller");

// 📍 Obtener todos los equipos
router.get("/", equiposController.getAll);

// 📍 Obtener un equipo por ID
router.get("/:id", equiposController.getById);

// 📍 Crear un nuevo equipo
router.post("/", equiposController.create);

// 📍 Actualizar un equipo por ID
router.put("/:id", equiposController.update);

// 📍 Eliminar un equipo por ID
router.delete("/:id", equiposController.delete);

module.exports = router;
