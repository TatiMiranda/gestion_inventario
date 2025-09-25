import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

// Rutas
import authRoutes from "./routes/auth.js";
import itemsRoutes from "./routes/items.js";
import assignmentsRoutes from "./routes/assignments.js";
import reportsRoutes from "./routes/reports.js";
import stockRoutes from "./routes/stock.js";
import equiposRoutes from "./routes/equipos.js";
// Middlewares
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ✅ Rutas
app.use("/api/auth", authRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/assignments", assignmentsRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/equipos", equiposRoutes);


// ✅ Middleware de errores (al final siempre)
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
