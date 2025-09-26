import { useState, useEffect } from "react";

export default function Seguimiento() {
  const [seguimientos, setSeguimientos] = useState([]);
  const [nuevo, setNuevo] = useState({
    equipo: "",
    sede: "",
    estado: "",
    fecha: "",
  });
  const [editando, setEditando] = useState(null);
  const [formEdit, setFormEdit] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Lista fija de sedes
  const sedesDisponibles = [
    "Manizales centro",
    "Arboleda",
    "Avenida 30 de agosto",
    "Campin",
    "Dorado plaza",
    "Panamericana",
  ];

  // 🔹 Cargar seguimientos
  const fetchSeguimientos = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/seguimientos");
      const data = await res.json();
      setSeguimientos(data);
    } catch (err) {
      console.error("Error al cargar seguimientos:", err);
      setMensaje("❌ Error al cargar seguimientos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeguimientos();
  }, []);

  // 🔹 Crear seguimiento
  const handleCrear = async (e) => {
    e.preventDefault();
    if (!nuevo.equipo || !nuevo.sede || !nuevo.estado || !nuevo.fecha) {
      return setMensaje("⚠️ Completa todos los campos");
    }

    try {
      const res = await fetch("http://localhost:4000/api/seguimientos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo),
      });

      const data = await res.json();
      if (!data.error) {
        setSeguimientos([...seguimientos, data]);
        setNuevo({ equipo: "", sede: "", estado: "", fecha: "" });
        setMensaje("✅ Seguimiento creado");
      } else {
        setMensaje(data.error);
      }
    } catch {
      setMensaje("❌ Error al crear seguimiento");
    }
  };

  // 🔹 Editar seguimiento
  const handleEditar = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/seguimientos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formEdit),
      });

      const data = await res.json();
      if (!data.error) {
        setSeguimientos(
          seguimientos.map((s) => (s.id === id ? { ...s, ...formEdit } : s))
        );
        setEditando(null);
        setFormEdit({});
        setMensaje("✅ Seguimiento actualizado");
      } else {
        setMensaje(data.error);
      }
    } catch {
      setMensaje("❌ Error al actualizar seguimiento");
    }
  };

  // 🔹 Eliminar seguimiento
  const handleEliminar = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este seguimiento?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/seguimientos/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!data.error) {
        setSeguimientos(seguimientos.filter((s) => s.id !== id));
        setMensaje("🗑️ Seguimiento eliminado");
      } else {
        setMensaje(data.error);
      }
    } catch {
      setMensaje("❌ Error al eliminar seguimiento");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6"> Seguimiento</h1>

      {/* Mensaje */}
      {mensaje && (
        <div className="mb-4 p-2 bg-gray-100 border rounded text-sm text-gray-700">
          {mensaje}
        </div>
      )}

      {/* Crear seguimiento */}
      <form onSubmit={handleCrear} className="grid grid-cols-4 gap-2 mb-6">
        <input
          type="text"
          value={nuevo.equipo}
          onChange={(e) => setNuevo({ ...nuevo, equipo: e.target.value })}
          placeholder="Equipo"
          className="px-2 py-1 border rounded"
        />
        <select
          value={nuevo.sede}
          onChange={(e) => setNuevo({ ...nuevo, sede: e.target.value })}
          className="px-2 py-1 border rounded"
        >
          <option value="">Selecciona sede</option>
          {sedesDisponibles.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={nuevo.estado}
          onChange={(e) => setNuevo({ ...nuevo, estado: e.target.value })}
          placeholder="Estado"
          className="px-2 py-1 border rounded"
        />
        <input
          type="date"
          value={nuevo.fecha}
          onChange={(e) => setNuevo({ ...nuevo, fecha: e.target.value })}
          className="px-2 py-1 border rounded"
        />
        <button
          type="submit"
          className="col-span-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-green-700"
        >
          Crear
        </button>
      </form>

      {/* Listado */}
      {loading ? (
        <p className="text-gray-500">⏳ Cargando seguimientos...</p>
      ) : seguimientos.length === 0 ? (
        <p className="text-gray-500">No hay seguimientos registrados.</p>
      ) : (
        <ul className="space-y-2">
          {seguimientos.map((seg) => (
            <li
              key={seg.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              {editando === seg.id ? (
                <div className="grid grid-cols-4 gap-2 w-full">
                  <input
                    type="text"
                    value={formEdit.equipo || ""}
                    onChange={(e) =>
                      setFormEdit({ ...formEdit, equipo: e.target.value })
                    }
                    className="px-2 py-1 border rounded"
                  />
                  <select
                    value={formEdit.sede || ""}
                    onChange={(e) =>
                      setFormEdit({ ...formEdit, sede: e.target.value })
                    }
                    className="px-2 py-1 border rounded"
                  >
                    <option value="">Selecciona sede</option>
                    {sedesDisponibles.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={formEdit.estado || ""}
                    onChange={(e) =>
                      setFormEdit({ ...formEdit, estado: e.target.value })
                    }
                    className="px-2 py-1 border rounded"
                  />
                  <input
                    type="date"
                    value={formEdit.fecha || ""}
                    onChange={(e) =>
                      setFormEdit({ ...formEdit, fecha: e.target.value })
                    }
                    className="px-2 py-1 border rounded"
                  />
                  <div className="col-span-4 flex gap-2 mt-2">
                    <button
                      onClick={() => handleEditar(seg.id)}
                      className="px-2 py-1 bg-blue-600 text-white rounded"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditando(null)}
                      className="px-2 py-1 bg-gray-400 text-white rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span>
                    <strong>{seg.equipo}</strong> – {seg.sede} –{" "}
                    <em>{seg.estado}</em> – 📅 {seg.fecha}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditando(seg.id);
                        setFormEdit(seg);
                      }}
                      className="px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(seg.id)}
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
