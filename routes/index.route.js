const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.route");
const centroCostosRoutes = require("./centrocostos.route");
const equiposRoutes = require("./equipos.route");
const proveedorRoutes = require("./proveedor.route");
const sedesRoutes = require("./sedes.route");
const seguimientoRoutes = require("./seguimiento.route");
const userRoutes = require("./user.route");

router.use("/auth", authRoutes);
router.use("/centrocostos", centroCostosRoutes);
router.use("/equipos", equiposRoutes);
router.use("/proveedores", proveedorRoutes);
router.use("/sedes", sedesRoutes);
router.use("/seguimiento", seguimientoRoutes);
router.use("/users", userRoutes);

module.exports = router;


