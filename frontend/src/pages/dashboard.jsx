import { motion } from "framer-motion";
import { LayoutDashboard, Package, Tags, Laptop } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-5xl"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-4"
          >
            <LayoutDashboard className="w-12 h-12 text-blue-600" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Bienvenido al panel de control 👋
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-xl text-center flex flex-col items-center"
          >
            <Package className="w-10 h-10 mb-3 opacity-80" />
            <h2 className="text-3xl font-bold">120</h2>
            <p className="mt-2 text-sm uppercase tracking-wide">
              Equipos en Inventario
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl shadow-xl text-center flex flex-col items-center"
          >
            <Tags className="w-10 h-10 mb-3 opacity-80" />
            <h2 className="text-3xl font-bold">8</h2>
            <p className="mt-2 text-sm uppercase tracking-wide">
              Categorías activas
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-xl text-center flex flex-col items-center"
          >
            <Laptop className="w-10 h-10 mb-3 opacity-80" />
            <h2 className="text-3xl font-bold">35</h2>
            <p className="mt-2 text-sm uppercase tracking-wide">
              Equipos asignados
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-sm text-gray-500">
          © 2025 ABAl Inventario - Panel de Control
        </div>
      </motion.div>
    </div>
  );
}
