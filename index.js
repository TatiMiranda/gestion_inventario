const express = require("express");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes/index.route");

const app = express();
app.use(cors());
app.use(express.json());

// Registrar todas las rutas
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
