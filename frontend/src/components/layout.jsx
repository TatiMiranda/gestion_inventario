import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Laptop,
  Tags,
  MapPin,
  Activity,
  Boxes,
  LogOut,
} from "lucide-react";

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-900 text-white flex flex-col justify-between shadow-lg backdrop-blur-md">
        <div>
          {/* Logo */}
          <div className="flex flex-col items-center justify-center py-4 border-b border-blue-500/40">
            <img
              src="/logo_blanco.png"
              alt="Logo"
              className="w-56 h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Menú */}
          <nav className="px-4 py-3 space-y-2">
            <h3 className="text-xs uppercase tracking-wider text-gray-300">
              Navegación
            </h3>

            {[
              { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
              { to: "/equipos", icon: <Laptop size={20} />, label: "Equipos" },
              { to: "/categorias", icon: <Tags size={20} />, label: "Categorías" },
              { to: "/sedes", icon: <MapPin size={20} />, label: "Sedes" },
              { to: "/seguimiento", icon: <Activity size={20} />, label: "Seguimiento" },
              { to: "/stock", icon: <Boxes size={20} />, label: "Stock" },
            ].map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-white/20 backdrop-blur-md border-l-4 border-white shadow-md text-white"
                      : "hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 hover:translate-x-1"
                  }`
                }
              >
                {icon} {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-blue-500/40">
          <button className="flex items-center gap-2 text-sm text-gray-200 hover:text-white transition">
            <LogOut size={18} /> Cerrar sesión
          </button>
          <p className="text-[11px] text-gray-400 mt-2">© 2025 ABAl Inventario</p>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 bg-gray-50 p-8">
        <Outlet />
      </main>
    </div>
  );
}
