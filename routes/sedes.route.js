const express = require("express");
const router = express.Router();
const sedesController = require("../controllers/sedes.controller");

// 📍 Obtener todas las sedes
router.get("/", sedesController.getAll);

// 📍 Obtener una sede por ID
router.get("/:id", sedesController.getById);

// 📍 Crear una nueva sede
router.post("/", sedesController.create);

// 📍 Actualizar una sede por ID
router.put("/:id", sedesController.update);

// 📍 Eliminar una sede por ID
router.delete("/:id", sedesController.delete);

module.exports = router;
