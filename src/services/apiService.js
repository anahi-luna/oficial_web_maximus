// src/services/apiService.js
const API_URL = "https://api.steinhq.com/v1/storages/6aa9d07f92b1163e9743cd57/Hoja1";

export const fetchProductos = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    // Sanitizado y formateo de datos recibidos de la planilla
    return data
      .filter((item) => item.activo === "TRUE") // Solo productos activos
      .map((item) => ({
        ...item,
        precio: Number(item.precio),
        precio_mayorista: Number(item.precio_mayorista),
        stock: Number(item.stock),
        destacado: item.destacado === "TRUE",
        // Convertimos los strings separados por comas en arrays limpios
        talles: item.talles ? item.talles.split(",").map((t) => t.trim()) : [],
        colores: item.colores ? item.colores.split(",").map((c) => c.trim()) : [],
      }));
  } catch (error) {
    console.error("Error cargando productos desde Stein:", error);
    return [];
  }
};