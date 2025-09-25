const categorias = await prisma.categoria.findMany({
  include: {
    _count: { select: { equipos: true } }
  }
});
res.json(categorias);
