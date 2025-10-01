import { useEffect, useState } from "react";

export default function Stock() {
  const [stock, setStock] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [sede, setSede] = useState("");
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const [formEdit, setFormEdit] = useState({ nombre: "", codigo: "" });

  // 📌 Cargar stock desde la API
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/api/stock")
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Datos cargados:", data);
        setStock(data);

        const sedesUnicas = [
          ...new Set(data.map((s) => s.equipo?.sede || "Sin sede")),
        ];
        setSedes(sedesUnicas);
      })
      .catch((err) => console.error("❌ Error cargando stock:", err))
      .finally(() => setLoading(false));
  }, []);

  // 📌 Cambiar estado
  const handleEstadoChange = async (equipoId, nuevoEstado) => {
    try {
      const res = await fetch(`http://localhost:4000/api/equipos/${equipoId}/estado`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (!res.ok) throw new Error("Error al actualizar estado");

      setStock((prev) =>
        prev.map((s) =>
          s.equipo.id === equipoId
            ? { ...s, equipo: { ...s.equipo, estado: nuevoEstado } }
            : s
        )
      );
    } catch (error) {
      console.error("❌ Error actualizando estado:", error);
      alert("Error al actualizar el estado");
    }
  };

  // 📌 Editar equipo
  const handleEditar = (s) => {
    setEditando(s.equipo.id);
    setFormEdit({ nombre: s.equipo?.nombre || "", codigo: s.equipo?.codigo || "" });
  };

  // 📌 Guardar edición en la BD
  const handleGuardarEdicion = async (equipoId) => {
    try {
      console.log("💾 Guardando edición", { equipoId, formEdit });

      // ✅ Ruta correcta según tu backend: /api/equipos/equipo/:id
      const res = await fetch(`http://localhost:4000/api/equipos/equipo/${equipoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formEdit),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Error del servidor:", errorText);
        throw new Error(`Error HTTP: ${res.status}`);
      }

      const data = await res.json();
      console.log("✅ Respuesta del servidor:", data);

      if (data.error) {
        alert(data.error);
        return;
      }

      // ✅ Actualizar el estado local con la respuesta del backend
      setStock((prev) =>
        prev.map((s) => {
          if (s.equipo.id === equipoId) {
            return {
              ...s,
              equipo: data.equipo // El backend ya devuelve el equipo completo con categoría y stock
            };
          }
          return s;
        })
      );

      setEditando(null);
      setFormEdit({ nombre: "", codigo: "" });
      alert("✅ Equipo actualizado correctamente");
    } catch (error) {
      console.error("⚠️ Error al editar equipo:", error);
      alert(`Error al guardar: ${error.message}`);
    }
  };

  // 📌 Eliminar equipo
  const handleEliminar = async (equipoId) => {
    if (!window.confirm("¿Seguro que deseas eliminar este equipo?")) return;

    try {
      console.log("🗑️ Eliminando equipo:", equipoId);

      const res = await fetch(`http://localhost:4000/api/equipos/equipo/${equipoId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Error del servidor:", errorText);
        throw new Error(`Error HTTP: ${res.status}`);
      }

      console.log("✅ Equipo eliminado del servidor");

      // ✅ Filtrar correctamente por el ID del equipo
      setStock((prev) => prev.filter((s) => s.equipo.id !== equipoId));
      
      alert("✅ Equipo eliminado correctamente");
    } catch (error) {
      console.error("⚠️ Error eliminando equipo:", error);
      alert(`Error al eliminar: ${error.message}`);
    }
  };

  // 📌 Filtrar por sede
  const equiposFiltrados =
    sede === "" ? stock : stock.filter((s) => s.equipo?.sede === sede);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Stock de Equipos y Seguimiento
      </h1>

      {/* Filtro */}
      <div className="mb-4 flex justify-end items-center gap-2">
        <label htmlFor="sede" className="font-medium text-gray-700">
          Filtrar por sede:
        </label>
        <select
          id="sede"
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

      {/* Tabla */}
      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : equiposFiltrados.length === 0 ? (
        <p className="text-gray-500">⚠️ No hay equipos en stock.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg shadow">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2 text-left">Equipo</th>
              <th className="p-2 text-left">Código</th>
              <th className="p-2 text-left">Categoría</th>
              <th className="p-2 text-left">Sede</th>
              <th className="p-2 text-center">Estado</th>
              <th className="p-2 text-center">Cantidad</th> 
              <th className="p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {equiposFiltrados.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-100">
                <td className="p-2">
                  {editando === s.equipo.id ? (
                    <input
                      value={formEdit.nombre}
                      onChange={(e) =>
                        setFormEdit({ ...formEdit, nombre: e.target.value })
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    s.equipo?.nombre
                  )}
                </td>
                <td className="p-2">
                  {editando === s.equipo.id ? (
                    <input
                      value={formEdit.codigo}
                      onChange={(e) =>
                        setFormEdit({ ...formEdit, codigo: e.target.value })
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    s.equipo?.codigo
                  )}
                </td>
                <td className="p-2">
                  {s.equipo?.categoria?.nombre || "Sin categoría"}
                </td>
                <td className="p-2">{s.equipo?.sede || "Sin sede"}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() =>
                      handleEstadoChange(
                        s.equipo.id,
                        s.equipo?.estado === "Activo" ? "Inactivo" : "Activo"
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
                <td className="p-2 text-center">
                  <div className="flex gap-2 justify-center">
                    {editando === s.equipo.id ? (
                      <>
                        <button
                          onClick={() => handleGuardarEdicion(s.equipo.id)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => {
                            setEditando(null);
                            setFormEdit({ nombre: "", codigo: "" });
                          }}
                          className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditar(s)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleEliminar(s.equipo.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}