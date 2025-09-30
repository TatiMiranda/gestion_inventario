const express = require('express');
const cors = require('cors');

const app = express();

// Ajusta el origen al puerto/dominio de tu frontend (ej. http://localhost:3000)
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

// ... tus rutas y lógica del backend ...
app.get('/api/ping', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
