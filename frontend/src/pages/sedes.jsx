import { useState, useEffect } from "react";

export default function Sedes() {
  const [sedes, setSedes] = useState([]);
  const [nuevaSede, setNuevaSede] = useState("");
  const [editando, setEditando] = useState(null);
  const [nombreEdit, setNombreEdit] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Lista fija de sedes disponibles
  const sedesDisponibles = [
    "Manizales centro",
    "Arboleda",
    "Avenida 30 de agosto",
    "Campin",
    "Dorado plaza",
    "Panamericana",
  ];

  // 🔹 Obtener sedes desde backend
  const fetchSedes = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/sedes");
      const data = await res.json();
      setSedes(data);
    } catch (err) {
      console.error("Error al cargar sedes:", err);
      setMensaje("❌ Error al cargar sedes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSedes();
  }, []);

  // 🔹 Crear sede
  const handleCrear = async (e) => {
    e.preventDefault();
    if (!nuevaSede) return setMensaje("⚠️ Selecciona una sede");

    if (sedes.some((s) => s.nombre.toLowerCase() === nuevaSede.toLowerCase())) {
      return setMensaje("⚠️ Esa sede ya está registrada");
    }

    try {
      const res = await fetch("http://localhost:4000/api/sedes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nuevaSede }),
      });

      const data = await res.json();
      if (!data.error) {
        setSedes([...sedes, data]);
        setNuevaSede("");
        setMensaje("✅ Sede creada");
      } else {
        setMensaje(data.error);
      }
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al crear la sede");
    }
  };

  // 🔹 Editar sede
  const handleEditar = async (id) => {
    if (!nombreEdit.trim()) return setMensaje("⚠️ Escribe un nombre válido");

    if (
      sedes.some(
        (s) =>
          s.id !== id && s.nombre.toLowerCase() === nombreEdit.toLowerCase()
      )
    ) {
      return setMensaje("⚠️ Ya existe otra sede con ese nombre");
    }

    try {
      const res = await fetch(`http://localhost:4000/api/sedes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombreEdit }),
      });

      const data = await res.json();
      if (!data.error) {
        setSedes(
          sedes.map((s) => (s.id === id ? { ...s, nombre: nombreEdit } : s))
        );
        setEditando(null);
        setNombreEdit("");
        setMensaje("✅ Sede actualizada");
      } else {
        setMensaje(data.error);
      }
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al actualizar la sede");
    }
  };

  // 🔹 Eliminar sede
  const handleEliminar = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar esta sede?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/sedes/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!data.error) {
        setSedes(sedes.filter((s) => s.id !== id));
        setMensaje("🗑️ Sede eliminada");
      } else {
        setMensaje(data.error);
      }
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al eliminar la sede");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6"> Sedes</h1>

      {/* Mensaje */}
      {mensaje && (
        <div className="mb-4 p-2 bg-gray-100 border rounded text-sm text-gray-700">
          {mensaje}
        </div>
      )}

      {/* Crear sede */}
      <form onSubmit={handleCrear} className="flex gap-2 mb-6">
        <select
          value={nuevaSede}
          onChange={(e) => setNuevaSede(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border"
        >
          <option value="">Selecciona una sede</option>
          {sedesDisponibles.map((sede) => (
            <option key={sede} value={sede}>
              {sede}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Crear
        </button>
      </form>

      {/* Listado */}
      {loading ? (
        <p className="text-gray-500"> Cargando sedes...</p>
      ) : sedes.length === 0 ? (
        <p className="text-gray-500">No hay sedes creadas.</p>
      ) : (
        <ul className="space-y-2">
          {sedes.map((sede) => (
            <li
              key={sede.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              {editando === sede.id ? (
                <div className="flex w-full gap-2">
                  <input
                    type="text"
                    value={nombreEdit}
                    onChange={(e) => setNombreEdit(e.target.value)}
                    className="flex-1 px-2 py-1 border rounded"
                  />
                  <button
                    onClick={() => handleEditar(sede.id)}
                    className="px-2 py-1 bg-blue-600 text-white rounded"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => {
                      setEditando(null);
                      setNombreEdit("");
                    }}
                    className="px-2 py-1 bg-gray-400 text-white rounded"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <span className="font-medium">{sede.nombre}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({sede._count?.equipos ?? 0} equipos)
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditando(sede.id);
                        setNombreEdit(sede.nombre);
                      }}
                      className="px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(sede.id)}
                      className="px-2 py-1 bg-red-600 text-white rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
