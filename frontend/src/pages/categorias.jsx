import { useState, useEffect } from "react";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [editando, setEditando] = useState(null);
  const [nombreEdit, setNombreEdit] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Obtener categorías con cantidad de equipos
  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/categorias");
      const data = await res.json();
      setCategorias(data);
    } catch (err) {
      console.error("Error al cargar categorías:", err);
      setMensaje("❌ Error al cargar categorías");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  // 🔹 Crear categoría
  const handleCrear = async (e) => {
    e.preventDefault();
    if (!nuevaCategoria.trim()) return setMensaje("⚠️ Escribe un nombre");

    if (
      categorias.some(
        (c) => c.nombre.toLowerCase() === nuevaCategoria.toLowerCase()
      )
    ) {
      return setMensaje("⚠️ Esa categoría ya existe");
    }

    try {
      const res = await fetch("http://localhost:4000/api/categorias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nuevaCategoria }),
      });

      const data = await res.json();
      if (!data.error) {
        setCategorias([...categorias, data]);
        setNuevaCategoria("");
        setMensaje("✅ Categoría creada");
      } else {
        setMensaje(data.error);
      }
    } catch {
      setMensaje("❌ Error al crear categoría");
    }
  };

  // 🔹 Editar categoría
  const handleEditar = async (id) => {
    if (!nombreEdit.trim()) return setMensaje("⚠️ Escribe un nombre válido");

    try {
      const res = await fetch(`http://localhost:4000/api/categorias/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombreEdit }),
      });

      const data = await res.json();
      if (!data.error) {
        setCategorias(
          categorias.map((c) => (c.id === id ? { ...c, nombre: nombreEdit } : c))
        );
        setEditando(null);
        setNombreEdit("");
        setMensaje("✅ Categoría actualizada");
      } else {
        setMensaje(data.error);
      }
    } catch {
      setMensaje("❌ Error al actualizar categoría");
    }
  };

  // 🔹 Eliminar categoría
  const handleEliminar = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar esta categoría?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/categorias/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!data.error) {
        setCategorias(categorias.filter((c) => c.id !== id));
        setMensaje("🗑️ Categoría eliminada");
      } else {
        setMensaje(data.error);
      }
    } catch {
      setMensaje("❌ Error al eliminar categoría");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6"> Categorías</h1>

      {/* Mensajes */}
      {mensaje && (
        <div className="mb-4 p-2 bg-gray-100 border rounded text-sm text-gray-700">
          {mensaje}
        </div>
      )}

      {/* Crear categoría */}
      <form onSubmit={handleCrear} className="flex gap-2 mb-6">
        <input
          type="text"
          value={nuevaCategoria}
          onChange={(e) => setNuevaCategoria(e.target.value)}
          placeholder="Nombre de la categoría"
          className="flex-1 px-4 py-2 rounded-lg border"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-purple-700"
        >
          Crear
        </button>
      </form>

      {/* Listado de categorías */}
      {loading ? (
        <p className="text-gray-500"> Cargando categorías...</p>
      ) : categorias.length === 0 ? (
        <p className="text-gray-500">No hay categorías creadas.</p>
      ) : (
        <ul className="space-y-2">
          {categorias.map((cat) => (
            <li
              key={cat.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              {editando === cat.id ? (
                <div className="flex w-full gap-2">
                  <input
                    type="text"
                    value={nombreEdit}
                    onChange={(e) => setNombreEdit(e.target.value)}
                    className="flex-1 px-2 py-1 border rounded"
                  />
                  <button
                    onClick={() => handleEditar(cat.id)}
                    className="px-2 py-1 bg-green-600 text-white rounded"
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
              ) : (
                <>
                  <span className="font-medium">
                    {cat.nombre}{" "}
                    <span className="text-sm text-gray-500">
                      ({cat._count?.equipos || 0} equipos)
                    </span>
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditando(cat.id);
                        setNombreEdit(cat.nombre);
                      }}
                      className="px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(cat.id)}
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
