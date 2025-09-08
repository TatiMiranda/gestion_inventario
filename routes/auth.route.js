const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Registro
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

module.exports = router;
