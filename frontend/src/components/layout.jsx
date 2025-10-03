import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Laptop,
  MapPin,
  Package,
  LogOut,
  User,
  Bell,
  Menu,
  X,
} from "lucide-react";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState({ 
    nombre: "Usuario", 
    email: "usuario@correo.com" 
  });

  // Obtener datos del usuario al cargar el componente
  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);
    } else {
      // Si no hay usuario en sesión, redirigir al login
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Limpiar sesión
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Cerrar modal
    setShowLogoutModal(false);
    
    // Redireccionar al login
    navigate("/");
  };

  const menuItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/equipos", icon: Laptop, label: "Equipos" },
    { to: "/sedes", icon: MapPin, label: "Sedes" },
    { to: "/stock", icon: Package, label: "Stock" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white flex flex-col transition-all duration-300 shadow-2xl h-screen fixed left-0 top-0 z-40`}
      >
        {/* Logo */}
        <div
          className={`p-6 border-b border-blue-500/30 flex-shrink-0 ${
            !sidebarOpen && "p-4"
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            {sidebarOpen ? (
              <>
                <div className="w-25 h-25 flex items-center justify-center">
                  <img
                    src="/logo_blanco.png"
                    alt="Logo"
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex flex-col">
                  {/* <span className="font-bold text-lg">Inventario </span> */}
                
                </div>
              </>
            ) : (
              <div className="w-35 h-35 flex items-center justify-center">
                <img
                  src="/logo_blanco.png"
                  alt="Logo"
                  className="object-contain w-full h-full" 
                />
              </div>
            )}
          </div>
        </div>

        {/* Menú */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto min-h-0">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-white text-blue-700 font-semibold shadow-lg"
                    : "hover:bg-blue-600/50 hover:translate-x-1"
                } ${!sidebarOpen && "justify-center px-2"}`
              }
              title={!sidebarOpen ? item.label : ""}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-blue-500/30 space-y-2 flex-shrink-0">
          {sidebarOpen && (
            <div className="flex items-center gap-3 px-4 py-2 bg-blue-800/50 rounded-lg mb-2">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">{currentUser.nombre}</p>
                <p className="text-xs text-blue-200 truncate">
                  {currentUser.email}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowLogoutModal(true)}
            className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl hover:bg-red-500/20 transition-all duration-200 hover:translate-x-1 ${
              !sidebarOpen && "justify-center px-2"
            }`}
            title={!sidebarOpen ? "Cerrar sesión" : ""}
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <div
        className={`flex-1 flex flex-col min-w-0 min-h-screen transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Panel de Control
                </h2>
                <p className="text-sm text-gray-500">
                  {location.pathname === "/dashboard" &&
                    "Vista general del sistema"}
                  {location.pathname === "/equipos" && "Gestión de equipos"}
                  {location.pathname === "/sedes" &&
                    "Administración de sedes"}
                  {location.pathname === "/stock" &&
                    "Control de inventario"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">
                    {currentUser.nombre}
                  </p>
                  <p className="text-xs text-gray-500">{currentUser.email}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Contenido dinámico */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>

      {/* Modal de confirmación de cierre de sesión */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <LogOut className="text-red-600" size={32} />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                ¿Cerrar sesión?
              </h3>

              <p className="text-gray-600 mb-6">
                Estás a punto de cerrar tu sesión. Tendrás que iniciar sesión
                nuevamente para acceder al sistema.
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}