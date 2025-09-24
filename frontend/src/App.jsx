import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importa tus páginas
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Items from "./pages/items";
import Categorias from "./pages/categorias";
import Equipos from "./pages/equipos";
import Sedes from "./pages/sedes";
import Seguimiento from "./pages/seguimiento";
import Stock from "./pages/stock";
import Layout from "./components/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas dentro de un layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/items" element={<Items />} />
          <Route path="/categorias" element={<Categorias />} />
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
