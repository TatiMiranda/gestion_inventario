import { useState, useEffect } from "react";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [editando, setEditando] = useState(null);
  const [nombreEdit, setNombreEdit] = useState("");

  // 🔹 Obtener categorías con cantidad de equipos
  const fetchCategorias = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/categorias");
      const data = await res.json();
      setCategorias(data);
    } catch (err) {
      console.error("Error al cargar categorías:", err);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  // 🔹 Crear categoría
  const handleCrear = async (e) => {
    e.preventDefault();
    if (!nuevaCategoria.trim()) return alert("Escribe un nombre");

    const res = await fetch("http://localhost:4000/api/categorias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nuevaCategoria }),
    });

    const data = await res.json();
    if (!data.error) {
      setNuevaCategoria("");
      fetchCategorias();
      alert("✅ Categoría creada");
    } else {
      alert(data.error);
    }
  };

  // 🔹 Editar categoría
  const handleEditar = async (id) => {
    if (!nombreEdit.trim()) return;

    const res = await fetch(`http://localhost:4000/api/categorias/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nombreEdit }),
    });

    const data = await res.json();
    if (!data.error) {
      setEditando(null);
      setNombreEdit("");
      fetchCategorias();
      alert("✅ Categoría actualizada");
    } else {
      alert(data.error);
    }
  };

  // 🔹 Eliminar categoría
  const handleEliminar = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar esta categoría?")) return;

    const res = await fetch(`http://localhost:4000/api/categorias/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (!data.error) {
      fetchCategorias();
      alert("🗑️ Categoría eliminada");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">📂 Categorías</h1>

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
          className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
        >
          Crear
        </button>
      </form>

      {/* Listado de categorías */}
      <ul className="space-y-2">
        {categorias.length === 0 ? (
          <p className="text-gray-500">No hay categorías creadas.</p>
        ) : (
          categorias.map((cat) => (
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
                  {/* Nombre de la categoría */}
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
          ))
        )}
      </ul>
    </div>
  );
}
