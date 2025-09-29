import { useEffect, useState } from "react";

export default function Stock() {
  const [stock, setStock] = useState([]);

  // 📌 Cargar stock desde la API
  useEffect(() => {
    fetch("http://localhost:4000/api/stock")
      .then((res) => res.json())
      .then((data) => setStock(data))
      .catch((err) => console.error("❌ Error cargando stock:", err));
  }, []);

  // 📌 Cambiar estado del equipo
  const handleEstadoChange = async (equipoId, nuevoEstado) => {
    try {
      await fetch(`http://localhost:4000/api/stock/${equipoId}/estado`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      // Actualizar el estado local
      setStock((prev) =>
        prev.map((s) =>
          s.equipo.id === equipoId
            ? { ...s, equipo: { ...s.equipo, estado: nuevoEstado } }
            : s
        )
      );
    } catch (error) {
      console.error("❌ Error actualizando estado:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        📦 Stock de Equipos
      </h1>

      {stock.length === 0 ? (
        <p className="text-gray-500">No hay equipos en stock.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg shadow">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2 text-left">Equipo</th>
              <th className="p-2 text-left">Código</th>
              <th className="p-2 text-left">Categoría</th>
              <th className="p-2 text-left">Sede</th> {/* 🔹 nueva columna */}
              <th className="p-2 text-center">Estado</th>
              <th className="p-2 text-center">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-100">
                <td className="p-2">{s.equipo?.nombre}</td>
                <td className="p-2">{s.equipo?.codigo}</td>
                <td className="p-2">
                  {s.equipo?.categoria?.nombre || "Sin categoría"}
                </td>
                <td className="p-2">{s.equipo?.sede || "Sin sede"}</td> {/* 🔹 mostrar sede */}
                <td className="p-2 text-center">
                  <button
                    onClick={() =>
                      handleEstadoChange(
                        s.equipo.id,
                        s.equipo?.estado === "Activo"
                          ? "Inactivo"
                          : "Activo"
                      )
                    }
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                      s.equipo?.estado === "Activo"
                        ? "bg-green-200 text-green-800 hover:bg-green-300"
                        : "bg-red-200 text-red-800 hover:bg-red-300"
                    }`}
                  >
                    {s.equipo?.estado}
                  </button>
                </td>
                <td className="p-2 text-center font-semibold">{s.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
