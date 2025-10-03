import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
      if (!form.email || !form.password) {
        setError("Por favor completa todos los campos");
        setIsLoading(false);
        return;
      }

      // Obtener usuarios registrados
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Buscar usuario con email y contraseña correctos
      const user = users.find(
        u => u.email === form.email && u.password === form.password
      );

      if (user) {
        console.log("✅ Login exitoso:", form.email);
        // Guardar sesión actual con todos los datos del usuario
        localStorage.setItem("currentUser", JSON.stringify({
          nombre: user.nombre,
          email: user.email
        }));
        navigate("/dashboard");
      } else {
        setError("Correo o contraseña incorrectos");
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = () => {
    alert("Para usar Google Login:\n\n1. Ve a Google Cloud Console\n2. Crea un proyecto\n3. Activa Google+ API\n4. Crea credenciales OAuth 2.0\n5. Copia el Client ID\n6. Reemplázalo en main.jsx");
  };

  const handleRegisterClick = () => {
    console.log("📝 Redirigiendo a registro...");
    navigate("/register");
  };

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
          Bienvenido 👋
        </h2>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

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
        <div className="mb-6">
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

        {/* Botón Ingresar */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 active:scale-98 transition duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center mb-6"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Ingresar"
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">o</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Botón Google */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full py-3 flex items-center justify-center border-2 border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 hover:border-gray-400 active:scale-98 transition disabled:bg-gray-50 disabled:cursor-not-allowed mb-6"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-6 h-6 mr-3"
          />
          <span className="font-medium text-gray-700">Ingresar con Google</span>
        </button>

        {/* Registro */}
        <p className="text-sm text-gray-500 text-center">
          ¿No tienes cuenta?{" "}
          <button
            onClick={handleRegisterClick}
            disabled={isLoading}
            className="text-blue-600 font-semibold hover:underline focus:outline-none disabled:opacity-50 transition"
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}