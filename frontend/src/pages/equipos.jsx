import { useState } from "react";

export default function Equipos() {
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [estado, setEstado] = useState("Activo");
  const [categoria, setCategoria] = useState("");

  // 🔹 Guardar equipo en la BD
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!nombre || !codigo || !categoria) return alert("Completa todos los campos");

    const res = await fetch("http://localhost:4000/api/equipos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, codigo, estado, categoria }),
    });

    const data = await res.json();
    if (!data.error) {
      setNombre("");
      setCodigo("");
      setEstado("Activo");
      setCategoria("");
      alert("✅ Equipo registrado correctamente");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6"> Registro de Equipos</h1>

      {/* Formulario */}
      <form onSubmit={handleAdd} className="space-y-4 mb-6">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del equipo"
          className="w-full px-4 py-2 rounded-lg border"
          required
        />

        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Código de barras / QR"
          className="w-full px-4 py-2 rounded-lg border"
          required
        />

        {/* Estado */}
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border"
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>

        {/* Categorías fijas */}
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border"
          required
        >
          <option value="">Selecciona categoría</option>
          <option value="Electrónico">Electrónico</option>
          <option value="Mueble">Mueble</option>
        </select>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Registrar equipo
        </button>
      </form>
    </div>
  );
}
