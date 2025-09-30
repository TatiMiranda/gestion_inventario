import { useEffect, useState } from "react";

export default function Sedes() {
  const [equipos, setEquipos] = useState([]);
  const [filtroSede, setFiltroSede] = useState("");
  const [filtroPiso, setFiltroPiso] = useState("");

  // 📌 Cargar equipos del backend
  useEffect(() => {
    fetch("http://localhost:4000/api/sedes")
      .then((res) => res.json())
      .then((data) => setEquipos(data))
      .catch((err) => console.error("Error cargando equipos:", err));
      console.log('Sedes mounted')
  }, []);

  // 📌 Filtrar equipos por sede y piso
  const equiposFiltrados = equipos.filter((eq) => {
    return (
      (filtroSede === "" || eq.sede === filtroSede) &&
      (filtroPiso === "" || eq.piso === filtroPiso)
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Equipos por Sede y Piso
      </h1>

      {/* 🔹 Filtros */}
      <div className="flex gap-4 mb-6">
        <select
          value={filtroSede}
          onChange={(e) => setFiltroSede(e.target.value)}
          className="px-4 py-2 rounded-lg border"
        >
          <option value="">Todas las sedes</option>
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
          className="px-4 py-2 rounded-lg border"
        >
          <option value="">Todos los pisos</option>
          <option value="Piso 1">Piso 1</option>
          <option value="Piso 2">Piso 2</option>
          <option value="Piso 3">Piso 3</option>
          <option value="Piso 4">Piso 4</option>
          <option value="Piso 5">Salas de formación</option>
        </select>
      </div>

      {/* 🔹 Tabla de resultados */}
      {equiposFiltrados.length === 0 ? (
        <p className="text-gray-500">No hay equipos en esta sede/piso.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg shadow">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Código</th>
              <th className="p-2 text-left">Categoría</th>
              <th className="p-2 text-left">Sede</th>
              <th className="p-2 text-left">Piso</th>
              <th className="p-2 text-left">Área</th>
              <th className="p-2 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {equiposFiltrados.map((eq) => (
              <tr key={eq.id} className="border-b hover:bg-gray-100">
                <td className="p-2">{eq.nombre}</td>
                <td className="p-2">{eq.codigo}</td>
                <td className="p-2">{eq.categoria || "Sin categoría"}</td>
                <td className="p-2">{eq.sede}</td>
                <td className="p-2">{eq.piso}</td>
                <td className="p-2">{eq.area}</td>
                <td className="p-2">{eq.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
