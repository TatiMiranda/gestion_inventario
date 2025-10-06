import { useEffect, useState } from "react";
import { Package, Layers, MapPin, X } from "lucide-react";

export default function Dashboard() {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sedesConEquipos, setSedesConEquipos] = useState([]);
  const [modalData, setModalData] = useState(null); // 👈 Aquí guardamos lo que se va a mostrar
  const [modalTitle, setModalTitle] = useState("");

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

        const listaSedes = Object.entries(sedesAgrupadas).map(
          ([sede, total]) => ({
            sede,
            total,
          })
        );

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

  // ✅ Función para abrir el modal
  const abrirModal = (tipo) => {
    if (tipo === "equipos") {
      setModalTitle("Equipos en Stock");
      setModalData(stock);
    } else if (tipo === "categorias") {
      setModalTitle("Categorías");
      setModalData(categoriasUnicas);
    } else if (tipo === "sedes") {
      setModalTitle("Sedes Totales");
      setModalData(sedesConEquipos);
    }
  };

  const cerrarModal = () => {
    setModalData(null);
    setModalTitle("");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-5xl font-bold text-blue-700 mb-10 mt-10 text-center">
        Dashboard General
      </h1>

      {/* Cards principales */}
      <div className="grid md:grid-cols-3 gap-8 mb-10">
        {/* Card Equipos */}
        <div
          onClick={() => abrirModal("equipos")}
          className="relative p-6 rounded-2xl bg-white shadow-lg overflow-hidden group cursor-pointer hover:scale-105 transition"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-300 via-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition"></div>
          <div className="relative flex items-center gap-4">
            <div className="p-4 rounded-full bg-blue-100 text-blue-600">
              <Package size={32} />
            </div>
            <div>
              <h2 className="text-lg font-medium">Equipos en Stock</h2>
              <p className="text-4xl font-bold text-blue-700">{totalEquipos}</p>
            </div>
          </div>
        </div>

        {/* Card Categorías */}
        <div
          onClick={() => abrirModal("categorias")}
          className="relative p-6 rounded-2xl bg-white shadow-lg overflow-hidden group cursor-pointer hover:scale-105 transition"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-300 via-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition"></div>
          <div className="relative flex items-center gap-4">
            <div className="p-4 rounded-full bg-green-100 text-green-600">
              <Layers size={32} />
            </div>
            <div>
              <h2 className="text-lg font-medium">Categorías</h2>
              <p className="text-4xl font-bold text-green-700">{totalCategorias}</p>
            </div>
          </div>
        </div>

        {/* Card Sedes */}
        <div
          onClick={() => abrirModal("sedes")}
          className="relative p-6 rounded-2xl bg-white shadow-lg overflow-hidden group cursor-pointer hover:scale-105 transition"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-300 via-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition"></div>
          <div className="relative flex items-center gap-4">
            <div className="p-4 rounded-full bg-pink-100 text-pink-600">
              <MapPin size={32} />
            </div>
            <div>
              <h2 className="text-lg font-medium">Sedes Totales</h2>
              <p className="text-4xl font-bold text-pink-700">{totalSedes}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-3/4 max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={cerrarModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              {modalTitle}
            </h2>

            {/* Contenido dinámico */}
            {modalTitle === "Equipos en Stock" && (
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Equipo</th>
                    <th className="p-2 text-left">Código</th>
                    <th className="p-2 text-left">Categoría</th>
                    <th className="p-2 text-left">Sede</th>
                    <th className="p-2 text-center">Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {modalData.map((s, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2">{s.equipo?.nombre}</td>
                      <td className="p-2">{s.equipo?.codigo}</td>
                      <td className="p-2">{s.equipo?.categoria?.nombre}</td>
                      <td className="p-2">{s.equipo?.sede}</td>
                      <td className="p-2 text-center">{s.cantidad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {modalTitle === "Categorías" && (
              <ul className="list-disc pl-6">
                {modalData.map((c, i) => (
                  <li key={i} className="py-1">{c}</li>
                ))}
              </ul>
            )}

            {modalTitle === "Sedes Totales" && (
              <ul className="list-disc pl-6">
                {modalData.map((s, i) => (
                  <li key={i} className="py-1">
                    {s.sede} — <b>{s.total}</b> equipos
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
