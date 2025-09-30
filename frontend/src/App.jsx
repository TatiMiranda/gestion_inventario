import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Importa tus páginas
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Equipos from "./pages/equipos";
import Sedes from "./pages/sedes";
import Stock from "./pages/stock";
import Layout from "./components/layout";
import Register from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Páginas de autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Layout público */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="equipos" element={<Equipos />} />
          <Route path="sedes" element={<Sedes />} />
          <Route path="stock" element={<Stock />} />
        </Route>

        {/* Rutas desconocidas → redirige al dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
