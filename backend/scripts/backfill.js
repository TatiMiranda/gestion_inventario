import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔁 Backfill: asignando categorías y stock...");

  // 1) Asegurar que exista la categoría "Otro" (por si acaso)
  const otroCat = await prisma.categoria.upsert({
    where: { nombre: "Otro" },
    update: {},
    create: { nombre: "Otro" },
  });

  // 2) Buscar equipos sin categoriaId y asignar por coincidencia en nombre
  const equiposSinCat = await prisma.equipo.findMany({
    where: { categoriaId: null },
  });

  console.log(`Encontrados ${equiposSinCat.length} equipos sin categoría.`);
  for (const e of equiposSinCat) {
    let categoriaNombre = "Otro";
    if (e.nombre?.toLowerCase().includes("gabinete")) categoriaNombre = "Gabinete";
    else if (e.nombre?.toLowerCase().includes("monitor")) categoriaNombre = "Monitor";
    else if (e.nombre?.toLowerCase().includes("diadema")) categoriaNombre = "Diadema";

    // buscar o crear
    const cat = await prisma.categoria.upsert({
      where: { nombre: categoriaNombre },
      update: {},
      create: { nombre: categoriaNombre },
    });

    await prisma.equipo.update({
      where: { id: e.id },
      data: { categoriaId: cat.id },
    });

    console.log(`> Equipo id=${e.id} -> categoria "${cat.nombre}"`);
  }

  // 3) Crear registros de stock para equipos que no tengan stock
  const allEquipos = await prisma.equipo.findMany({ select: { id: true } });
  const stocks = await prisma.stock.findMany({ select: { equipoId: true } });
  const stockSet = new Set(stocks.map(s => s.equipoId));

  let createdCount = 0;
  for (const e of allEquipos) {
    if (!stockSet.has(e.id)) {
      await prisma.stock.create({
        data: { equipoId: e.id, cantidad: 1 },
      });
      createdCount++;
      console.log(`> Se creó stock para equipo id=${e.id}`);
    }
  }

  console.log(`✔️ Backfill completado. Stocks creados: ${createdCount}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
