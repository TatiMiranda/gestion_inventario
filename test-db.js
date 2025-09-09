const db = require("./services/db.service");

async function testConnection() {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    console.log("✅ Conexión exitosa a la base de datos. Resultado:", rows[0].result);
    process.exit(0); // salir si todo bien
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error.message);
    process.exit(1); // salir con error
  }
}

testConnection();
