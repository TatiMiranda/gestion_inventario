const express = require("express");
const router = express.Router();

// Importar rutas
const userRoute = require("./user.route");
const sedesRoutes = require("./sedes.route");
const seguimientoRoutes = require("./seguimiento.route");
const centroCostosRoute = require("./centrocostos.route");
const proveedoresRoute = require("./proveedores.route");
const equiposRoute = require("./equipos.route");



// Usar rutas
router.use("/users", userRoute);
router.use("/sedes", sedesRoutes);
router.use("/seguimiento", seguimientoRoutes);
router.use("/centrocostos", centroCostosRoute);
router.use("/proveedores", proveedoresRoute);
router.use("/equipos", equiposRoute);

module.exports = router;
