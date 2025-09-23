require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
const authRouter = require('./routes/auth');
const itemsRouter = require('./routes/items');
const assignmentsRouter = require('./routes/assignments');
const reportsRouter = require('./routes/reports');

app.use('/api/reports', reportsRouter);
app.use('/api/auth', authRouter);
app.use('/api/items', itemsRouter);
app.use('/api/assignments', assignmentsRouter);

//middleware para manejo de errores
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
