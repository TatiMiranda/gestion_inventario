import { useState, useEffect } from "react";

export default function Seguimiento() {
  const [equipos, setEquipos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [nombre, setNombre] = useState("");
  const [sede, setSede] = useState(""); // 🔹 sede seleccionada

  // 🔹 Sedes registradas (puedes cambiarlas según tu BD)
  const sedes = [
    "Bogotá",
    "Medellín",
    "Cali",
    "Avenida 30 de agosto",
  ];

  const buscarEquipos = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:4000/api/equipos/seguimiento?nombre=${nombre}&sede=${sede}`
      );

      if (!response.ok) throw new Error("Error al cargar seguimientos");

      const data = await response.json();
      setEquipos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarEquipos();
  }, [nombre, sede]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Seguimiento</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
          ❌ {error}
        </div>
      )}

      {/* Buscador */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar equipo..."
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="flex-1 border rounded p-2"
        />

        <select
          value={sede}
          onChange={(e) => setSede(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">Todas las sedes</option>
          {sedes.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla de resultados */}
      {loading ? (
        <p>Cargando...</p>
      ) : equipos.length > 0 ? (
        <table className="w-full border rounded shadow">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-2">Equipo</th>
              <th className="p-2">Código</th>
              <th className="p-2">Categoría</th>
              <th className="p-2">Sede</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {equipos.map((eq) => (
              <tr key={eq.id} className="border-b">
                <td className="p-2">{eq.nombre}</td>
                <td className="p-2">{eq.codigo}</td>
                <td className="p-2">{eq.categoria?.nombre || "Sin categoría"}</td>
                <td className="p-2">{eq.sede}</td>
                <td className="p-2">{eq.estado}</td>
                <td className="p-2">{eq.stock?.cantidad || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay seguimientos registrados.</p>
      )}
    </div>
  );
}
