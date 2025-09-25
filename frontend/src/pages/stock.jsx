import { useState, useEffect } from "react";

export default function Stock() {
  const [equipos, setEquipos] = useState([]);

  // 🔹 Cargar equipos desde la API
  const fetchEquipos = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/equipos");
      const data = await res.json();
      setEquipos(data);
    } catch (error) {
      console.error("Error cargando equipos:", error);
    }
  };

  useEffect(() => {
    fetchEquipos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">📦 Stock de Equipos</h1>

      {equipos.length === 0 ? (
        <p className="text-gray-500">No hay equipos registrados.</p>
      ) : (
        <table className="w-full border rounded-lg overflow-hidden shadow">
          <thead className="bg-green-100 text-green-700">
            <tr>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Código</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Categoría</th>
            </tr>
          </thead>
          <tbody>
            {equipos.map((eq) => (
              <tr key={eq.id} className="border-t">
                <td className="px-4 py-2">{eq.nombre}</td>
                <td className="px-4 py-2">{eq.codigo}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      eq.estado === "Activo"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {eq.estado}
                  </span>
                </td>
                <td className="px-4 py-2">{eq.categoria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
