import { useEffect, useState } from "react";

export default function Equipos() {
  const [equipos, setEquipos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [estado, setEstado] = useState("Activo");
  const [categoria, setCategoria] = useState("");
  const [sede, setSede] = useState("");
  const [piso, setPiso] = useState(""); // 🔹 Nuevo estado para piso

  // 📌 Cargar equipos al iniciar
  useEffect(() => {
    fetch("http://localhost:4000/api/equipos")
      .then((res) => res.json())
      .then((data) => setEquipos(data))
      .catch((err) => console.error("⚠️ Error cargando equipos:", err));
  }, []);

  // 📌 Registrar equipo
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!nombre || !codigo || !sede || !piso) {
      return alert("Completa todos los campos obligatorios");
    }

    try {
      const res = await fetch("http://localhost:4000/api/equipos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          codigo,
          estado,
          categoria: categoria || null,
          sede,
          piso, // 🔹 enviamos piso al backend
        }),
      });

      const data = await res.json();
      console.log("📥 Respuesta backend:", data);

      if (!data.error) {
        setEquipos((prev) => [...prev, data.equipo]);
        setNombre("");
        setCodigo("");
        setEstado("Activo");
        setCategoria("");
        setSede("");
        setPiso(""); // 🔹 limpiar piso
        alert("✅ Equipo registrado correctamente");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("❌ Error registrando equipo:", err);
      alert("⚠️ Error de red o backend caído");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Registro de Equipos
      </h1>

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

        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border"
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border"
        >
          <option value="">Selecciona categoría</option>
          <option value="Gabinete">Gabinete</option>
          <option value="Monitor">Monitor</option>
          <option value="Diadema">Diadema</option>
          <option value="Otro">Otro</option>
        </select>

        {/* 🔹 Select para sede */}
        <select
          value={sede}
          onChange={(e) => setSede(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border"
          required
        >
          <option value="">Selecciona sede</option>
          <option value="Manizales Centro">Manizales Centro</option>
          <option value="Arboleda">Arboleda</option>
          <option value="Avenida 30 de agosto">Avenida 30 de agosto</option>
          <option value="Campin">Campin</option>
          <option value="Dorado plaza">Dorado plaza</option>
          <option value="Panamericana">Panamericana</option>
        </select>

        {/* 🔹 Select para piso */}
        <select
          value={piso}
          onChange={(e) => setPiso(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border"
          required
        >
          <option value="">Selecciona en qué piso está el equipo</option>
          <option value="Piso 1">Piso 1</option>
          <option value="Piso 1 - Administracion">Piso 1 - Administración</option>
          <option value="Piso 2">Piso 2</option>
          <option value="Piso 3">Piso 3</option>
          <option value="Piso 4">Piso 4</option>
          <option value="Piso 5">Piso 5</option>
          <option value="Salas de formación">Salas de formación</option>
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