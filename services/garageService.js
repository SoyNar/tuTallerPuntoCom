import {
  obtenerTalleres,
  obtenerTallerPorId,
} from "./taller-service.js";

// Todos los talleres del backend
export function fetchTalleres() {
  return obtenerTalleres();
}

// Un taller por id (usa la caché)
export function fetchTallerPorId(id) {
  return obtenerTallerPorId(id);
}

// Talleres que tienen al menos un servicio activo
export async function fetchTalleresActivos() {
  const talleres = await obtenerTalleres();
  return talleres.filter((t) => (t.services ?? []).some((s) => s.active));
}

// Talleres que ofrecen un servicio activo con ese nombre o categoría
export async function buscarTalleresPorServicio(servicio) {
  const valor = servicio.trim().toLowerCase();
  const talleres = await obtenerTalleres();

  return talleres.filter((t) =>
    (t.services ?? []).some(
      (s) =>
        s.active &&
        (s.name.toLowerCase().includes(valor) ||
          s.categoryServices.toLowerCase() === valor),
    ),
  );
}