import { useEffect, useState } from "react";
import { getItems } from "../services/itemService";

export default function Items() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await getItems();
        setItems(data);
      } catch (err) {
        console.error("Error cargando items", err);
      }
    }
    fetchItems();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventario</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.nombre}</td>
              <td className="border p-2">{item.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
