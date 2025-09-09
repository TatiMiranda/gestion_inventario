const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// 📍 Obtener todos los usuarios
router.get("/", userController.getAll);

// 📍 Obtener un usuario por ID
router.get("/:id", userController.getById);

// 📍 Crear un nuevo usuario
router.post("/", userController.create);

// 📍 Actualizar un usuario por ID
router.put("/:id", userController.update);

// 📍 Eliminar un usuario por ID
router.delete("/:id", userController.delete);

module.exports = router;
