import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login con:", form);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/vite.svg" // 👉 cambia por tu logo
            alt="Logo"
            className="w-20 h-20"
          />
        </div>

        {/* Título */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Bienvenido 👋
        </h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="ejemplo@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Ingresar
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-400 text-sm">o</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Login con Google */}
        <button className="w-full py-3 flex items-center justify-center border border-gray-300 rounded-xl shadow-sm hover:bg-gray-100 transition">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-6 h-6 mr-2"
          />
          Ingresar con Google
        </button>

        {/* Registro */}
        <p className="text-sm text-gray-500 text-center mt-6">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-indigo-600 font-semibold hover:underline">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}
import { BrowserRouter, Routes, Route } from "react-router-dom";