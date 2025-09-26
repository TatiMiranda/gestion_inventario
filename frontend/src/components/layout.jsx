import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Boxes,
  Tags,
  Laptop,
  MapPin,
  Activity,
  Package,
  LogOut,
} from "lucide-react";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-500 via-blue-700 to-blue-900 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 text-center border-b border-blue-400">
          <h1 className="text-2xl font-bold">Inventario</h1>
        </div>

        {/* Menú */}
        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-800 font-semibold" : "hover:bg-blue-600"
              }`
            }
          >
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>

          <NavLink
            to="/items"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-800 font-semibold" : "hover:bg-blue-600"
              }`
            }
          >
            <Boxes size={20} /> Items
          </NavLink>

          <NavLink
            to="/categorias"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-800 font-semibold" : "hover:bg-blue-600"
              }`
            }
          >
            <Tags size={20} /> Categorías
          </NavLink>

          <NavLink
            to="/equipos"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-800 font-semibold" : "hover:bg-blue-600"
              }`
            }
          >
            <Laptop size={20} /> Equipos
          </NavLink>

          <NavLink
            to="/sedes"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-800 font-semibold" : "hover:bg-blue-600"
              }`
            }
          >
            <MapPin size={20} /> Sedes
          </NavLink>

          <NavLink
            to="/seguimiento"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-800 font-semibold" : "hover:bg-blue-600"
              }`
            }
          >
            <Activity size={20} /> Seguimiento
          </NavLink>

          <NavLink
            to="/stock"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-800 font-semibold" : "hover:bg-blue-600"
              }`
            }
          >
            <Package size={20} /> Stock
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-blue-400">
          <button className="flex items-center gap-2 px-4 py-2 w-full text-left rounded-lg hover:bg-blue-600 transition">
            <LogOut size={20} /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">Panel de control</h2>
          <span className="text-gray-500 text-sm">Usuario: admin@correo.com</span>
        </header>

        {/* Contenido dinámico */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
