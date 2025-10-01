import { useEffect, useState } from "react";
import { Package, Layers, MapPin } from "lucide-react";

export default function Dashboard() {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sedesConEquipos, setSedesConEquipos] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/api/stock")
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Datos cargados para Dashboard:", data);
        setStock(data);

        // Agrupar equipos por sede
        const sedesAgrupadas = {};
        data.forEach((s) => {
          const sede = s.equipo?.sede || "Sin sede";
          sedesAgrupadas[sede] =
            (sedesAgrupadas[sede] || 0) + (s.cantidad || 0);
        });

        const listaSedes = Object.entries(sedesAgrupadas).map(([sede, total]) => ({
          sede,
          total,
        }));

        setSedesConEquipos(listaSedes);
      })
      .catch((err) => console.error("❌ Error cargando stock:", err))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Calcular métricas generales
  const totalEquipos = stock.reduce((acc, s) => acc + (s.cantidad || 0), 0);

  const categoriasUnicas = [
    ...new Set(stock.map((s) => s.equipo?.categoria?.nombre || "Sin categoría")),
  ];
  const totalCategorias = categoriasUnicas.length;

  const totalSedes = sedesConEquipos.length;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-5xl font-bold text-blue-700 mb-10 mt-10 text-center">
         Dashboard General
      </h1>

      {/* Cards principales */}
      <div className="grid md:grid-cols-3 gap-8 mb-10">
        {/* Card Equipos */}
        <div className="relative p-6 rounded-2xl bg-white shadow-lg overflow-hidden group">
          <div className="absolute inset-0 rounded-2xl border-4 border-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center gap-4">
            <div className="p-4 rounded-full bg-blue-100 text-blue-600">
              <Package size={32} />
            </div>
            <div>
              <h2 className="text-lg font-medium text-black-600">
                Equipos en Stock
              </h2>
              <p className="text-4xl font-bold text-blue-700">{totalEquipos}</p>
            </div>
          </div>
        </div>

        {/* Card Categorías */}
        <div className="relative p-6 rounded-2xl bg-white shadow-lg overflow-hidden group">
          <div className="absolute inset-0 rounded-2xl border-4 border-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center gap-4">
            <div className="p-4 rounded-full bg-green-100 text-green-600">
              <Layers size={32} />
            </div>
            <div>
              <h2 className="text-lg font-medium text-black-600">Categorías</h2>
              <p className="text-4xl font-bold text-green-700">{totalCategorias}</p>
            </div>
          </div>
        </div>

        {/* Card Total Sedes */}
        <div className="relative p-6 rounded-2xl bg-white shadow-lg overflow-hidden group">
          <div className="absolute inset-0 rounded-2xl border-4 border-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center gap-4">
            <div className="p-4 rounded-full bg-pink-100 text-pink-600">
              <MapPin size={32} />
            </div>
            <div>
              <h2 className="text-lg font-medium text-black-600">Sedes Totales</h2>
              <p className="text-4xl font-bold text-pink-700">{totalSedes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
