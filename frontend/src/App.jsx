import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Importa tus páginas (IMPORTANTE: verifica que los nombres coincidan con tus archivos)
import Login from "./pages/login";          // Cambio: Login con mayúscula
import Register from "./pages/register";    // Cambio: Register con mayúscula
import Dashboard from "./pages/dashboard";  // Cambio: Dashboard con mayúscula
import Equipos from "./pages/equipos";      // Cambio: Equipos con mayúscula
import Sedes from "./pages/sedes";          // Cambio: Sedes con mayúscula
import Stock from "./pages/stock";          // Cambio: Stock con mayúscula
import Layout from "./components/layout";   // Cambio: Layout con mayúscula

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige la raíz al login si no está autenticado */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Páginas de autenticación (sin Layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas con Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="equipos" element={<Equipos />} />
          <Route path="sedes" element={<Sedes />} />
          <Route path="stock" element={<Stock />} />
        </Route>

        {/* Rutas desconocidas → redirige al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;