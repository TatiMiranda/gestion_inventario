import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importa tus páginas
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Equipos from "./pages/equipos";
import Sedes from "./pages/sedes";
import Seguimiento from "./pages/seguimiento";
import Stock from "./pages/stock";
import Layout from "./components/layout";
import Register from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas dentro de un layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/equipos" element={<Equipos />} />
          <Route path="/sedes" element={<Sedes />} />
          <Route path="/seguimiento" element={<Seguimiento />} />
          <Route path="/stock" element={<Stock />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
