const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Configurar motor de vistas (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Archivos estáticos (css, js, imágenes)
app.use(express.static(path.join(__dirname, "../public")));

// Rutas principales
app.get("/", (req, res) => {
  res.render("dashboard"); // Vista inicial
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/usuarios", (req, res) => {
  res.render("users/categoria"); // ejemplo
});

app.get("/equipos", (req, res) => {
  res.render("equipos");
});

app.get("/stock", (req, res) => {
  res.render("stock");
});

app.get("/centro-costos", (req, res) => {
  res.render("centro_costos");
});

app.get("/sedes", (req, res) => {
  res.render("sedes");
});

app.get("/perfil", (req, res) => {
  res.render("perfil");
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
});
