const express = require("express");
const router = express.Router();
const equiposController = require("../controllers/equipos.controller");

// Crear equipo
router.post("/", equiposController.create);

// Listar equipos
router.get("/", equiposController.findAll);

// Buscar un equipo
router.get("/:id", equiposController.findOne);

// Actualizar equipo
router.put("/:id", equiposController.update);

// Eliminar equipo
router.delete("/:id", equiposController.delete);

module.exports = router;
// CRUD Equipos 
// router.get("/", equiposController.findAll);      // Listar equipos
// router.get("/:id", equiposController.findOne);   // Obtener un equipo