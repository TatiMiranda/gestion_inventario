// config/db.js
const { PrismaClient } = require('@prisma/client');

// Se crea una instancia única de PrismaClient
const prisma = new PrismaClient();

module.exports = prisma;
