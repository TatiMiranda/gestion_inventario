const express = require("express");
const router = express.Router();
const proveedorController = require("../controllers/proveedor.controller");

// 📍 Obtener todos los proveedores
router.get("/", proveedorController.getAll);

// 📍 Obtener un proveedor por ID
router.get("/:id", proveedorController.getById);

// 📍 Crear un nuevo proveedor
router.post("/", proveedorController.create);

// 📍 Actualizar un proveedor por ID
router.put("/:id", proveedorController.update);

// 📍 Eliminar un proveedor por ID
router.delete("/:id", proveedorController.delete);

module.exports = router;
