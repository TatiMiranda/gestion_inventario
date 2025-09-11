// routes/proveedores.route.js
const express = require("express");
const router = express.Router();
const proveedoresController = require("../controllers/proveedores.controller");


// Rutas de proveedores
router.get("/", proveedoresController.findAll);
router.get("/:id", proveedoresController.findOne);
router.post("/", proveedoresController.create);
router.put("/:id", proveedoresController.update);
router.delete("/:id", proveedoresController.delete);

module.exports = router;
