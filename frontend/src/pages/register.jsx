import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registro con:", form);
    // Aquí podrías enviar los datos al backend con fetch o axios
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <img
        src="/images.png"
        alt="Logo"
        className="w-40 h-auto object-contain mx-auto"
        />

        {/* Título */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Crear cuenta ✨
        </h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-600 mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Tu nombre"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
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

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-1">
              Confirmar contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={form.confirmPassword}
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
            Registrarme
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-gray-500 text-center mt-6">
          ¿Ya tienes cuenta?{" "}
          <a href="/" className="text-indigo-600 font-semibold hover:underline">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
}
