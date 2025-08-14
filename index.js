const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware para parsear JSON (opcional)
// app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Servidor Express funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
