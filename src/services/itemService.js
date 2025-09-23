// src/services/itemsService.js
import api from "./api";

export const getItems = async () => {
  try {
    const response = await api.get("/items"); // ajusta la ruta según tu backend
    return response.data;
  } catch (error) {
    console.error("Error al obtener los items:", error);
    throw error;
  }
};
