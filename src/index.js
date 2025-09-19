const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Configurar EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// Importar rutas
const authRoutes = require('./routes/auth.routes');

// Usar rutas
app.use('/', authRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.render('login');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});