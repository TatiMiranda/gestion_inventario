const express = require('express');
const router = express.Router();

// GET para mostrar la vista de registro
router.get('/register', (req, res) => {
    res.render('register');
});

// POST para procesar el registro
router.post('/register', (req, res) => {
    // Lógica para registrar usuario
});

module.exports = router;