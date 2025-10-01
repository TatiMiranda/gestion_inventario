import { useEffect, useState } from "react";

export default function Sedes() {
  const [equipos, setEquipos] = useState([]);
  const [filtroSede, setFiltroSede] = useState("");
  const [filtroPiso, setFiltroPiso] = useState("");

  // 📌 Cargar equipos del backend
  useEffect(() => {
    fetch("http://localhost:4000/api/equipos") // usa tu endpoint correcto
      .then((res) => res.json())
      .then((data) => setEquipos(data))
      .catch((err) => console.error("Error cargando equipos:", err));
  }, []);

  // 📌 Filtrar equipos según sede y piso seleccionados
  const equiposFiltrados = equipos.filter((eq) => {
    return (
      (filtroSede === "" || eq.sede === filtroSede) &&
      (filtroPiso === "" || eq.piso === filtroPiso)
    );
  });

  return (
    <div className="p-6 space-y-6">
      {/* Título */}
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
         Consulta de Equipos por Sede y Piso
      </h1>

      {/* 🔹 Filtros */}
      <div className="bg-white shadow-md p-4 rounded-xl flex flex-wrap gap-4 border">
        <select
          value={filtroSede}
          onChange={(e) => setFiltroSede(e.target.value)}
          className="px-4 py-2 rounded-lg border w-56"
        >
          <option value=""> Todas las sedes</option>
          <option value="Manizales Centro">Manizales Centro</option>
          <option value="Arboleda">Arboleda</option>
          <option value="Avenida 30 de agosto">Avenida 30 de agosto</option>
          <option value="Campin">Campin</option>
          <option value="Dorado plaza">Dorado plaza</option>
          <option value="Panamericana">Panamericana</option>
        </select>

        <select
          value={filtroPiso}
          onChange={(e) => setFiltroPiso(e.target.value)}
          className="px-4 py-2 rounded-lg border w-56"
        >
          <option value=""> Todos los pisos</option>
          <option value="Piso 1">Piso 1</option>
          <option value="Piso 1 - Administracion">Piso 1 - Administracion</option>
          <option value="Piso 2">Piso 2</option>
          <option value="Piso 3">Piso 3</option>
          <option value="Piso 4">Piso 4</option>
          <option value="Piso 5">Piso 5</option>
          <option value="Salas de formación">Salas de formación</option>
        </select>
      </div>

      {/* 🔹 Resultados */}
      {equiposFiltrados.length === 0 ? (
        <p className="text-gray-500 italic">
          ⚠️ No hay equipos en {filtroSede || "ninguna sede"} {filtroPiso && `- ${filtroPiso}`}.
        </p>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
             {filtroSede || "Todas las sedes"}{" "}
            {filtroPiso && `- ${filtroPiso}`}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equiposFiltrados.map((eq) => (
              <div
                key={eq.id}
                className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {eq.nombre}
                </h2>
                <p className="text-sm text-gray-500">Código: {eq.codigo}</p>
                <p className="text-sm text-gray-500">
                  Categoría: {eq.categoria?.nombre || "Sin categoría"}
                </p>
                <p className="text-sm text-gray-600"> {eq.sede}</p>
                <p className="text-sm text-gray-600"> {eq.piso}</p>
                {eq.area && (
                  <p className="text-sm text-gray-600"> Área: {eq.area}</p>
                )}

                {/* Estado */}
                <span
                  className={`inline-block mt-3 px-3 py-1 text-sm font-medium rounded-full ${
                    eq.estado === "Activo"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {eq.estado}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
