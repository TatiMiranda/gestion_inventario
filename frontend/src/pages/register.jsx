import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      // Validaciones
      if (!form.nombre || !form.email || !form.password || !form.confirmPassword) {
        setError("Por favor completa todos los campos");
        setIsLoading(false);
        return;
      }

      if (form.password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        setIsLoading(false);
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError("Las contraseñas no coinciden");
        setIsLoading(false);
        return;
      }

      // Guardar usuario en memoria (simulación)
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Verificar si el email ya existe
      if (users.some(user => user.email === form.email)) {
        setError("Este correo ya está registrado");
        setIsLoading(false);
        return;
      }

      // Agregar nuevo usuario
      users.push({
        nombre: form.nombre,
        email: form.email,
        password: form.password
      });
      
      localStorage.setItem("users", JSON.stringify(users));
      
      console.log("✅ Registro exitoso:", form.email);
      setSuccess(true);
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate("/");
      }, 2000);

      setIsLoading(false);
    }, 1000);
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 via-blue-600 to-blue-900 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ¡Registro exitoso!
          </h2>
          <p className="text-gray-600">
            Redirigiendo al inicio de sesión...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 via-blue-600 to-blue-900 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="text-6xl font-bold text-blue-700 tracking-wider">
            ABAI
          </div>
        </div>

        {/* Título */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Crear cuenta ✨
        </h2>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-5">
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Nombre completo
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Tu nombre completo"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-2"
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
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="correo@ejemplo.com"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition"
                disabled={isLoading}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition"
                disabled={isLoading}
                aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Botón Registrar */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 active:scale-98 transition duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center mb-6"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Registrarme"
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-gray-500 text-center">
          ¿Ya tienes cuenta?{" "}
          <button
            onClick={handleLoginClick}
            disabled={isLoading}
            className="text-blue-600 font-semibold hover:underline focus:outline-none disabled:opacity-50 transition"
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
}