// frontend/src/components/Layout.jsx
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Inventario</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/items">Items</Link>
          <Link to="/categorias">Categorías</Link>
          <Link to="/equipos">Equipos</Link>
          <Link to="/sedes">Sedes</Link>
          <Link to="/seguimiento">Seguimiento</Link>
          <Link to="/stock">Stock</Link>
        </nav>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet /> {/* Aquí se cargan las páginas */}
      </main>
    </div>
  );
}
