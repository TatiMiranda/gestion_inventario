const express = require("express");
const router = express.Router();

// OJO: el nombre debe coincidir exactamente con tu archivo (centroCostos.controller.js)
const centroCostosController = require("../controllers/centroCostos.controller.js");

// Rutas CRUD
router.post("/", centroCostosController.create);
router.get("/", centroCostosController.findAll);
router.get("/:id", centroCostosController.findOne);
router.put("/:id", centroCostosController.update);
router.delete("/:id", centroCostosController.delete);

module.exports = router;
