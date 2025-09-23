import { useState } from "react";
import { login } from "../services/authService";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ usuario, password });
      window.location.href = "/dashboard"; // redirigir
    } catch (err) {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-900">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/logo.png" // cambia esto por la ruta de tu logo
            alt="Logo"
            className="h-12"
          />
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold">Usuario</label>
          <input
            type="text"
            placeholder="Ingresa tu nombre de usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="border rounded p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block mb-2 font-semibold">Contraseña</label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded w-full transition"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-blue-600 font-semibold">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}
