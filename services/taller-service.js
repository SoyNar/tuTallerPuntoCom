import { get } from "../js/api/http.js";

let talleres = null;
let pendiente = null;

/**
 * Pide una página al servidor.
 * Devuelve el objeto completo: { content, page, size, totalElements, totalPage, last }
 */
export function obtenerPaginaTalleres({ page = 0, size = 6, status } = {}) {
  const params = new URLSearchParams({ page, size });
  if (status) params.set("status", status);
  return get(`/workshops?${params}`);
}

/**
 * Lista completa de talleres (para el admin y búsquedas por id).
 * Pide una página grande y guarda solo el array en caché.
 */
export function obtenerTalleres({ forzar = false } = {}) {
  if (talleres && !forzar) {
    return Promise.resolve(talleres);
  }

  if (!pendiente) {
    pendiente = get("/workshops?page=0&size=1000")
      .then((data) => {
        talleres = data.content;
        return talleres;
      })
      .finally(() => {
        pendiente = null;
      });
  }

  return pendiente;
}

/** Busca un taller por id usando la caché. */
export async function obtenerTallerPorId(id) {
  const lista = await obtenerTalleres();
  return lista.find((t) => String(t.id) === String(id));
}

/** Borra la caché. La próxima lectura vuelve al backend. */
export function invalidarTalleres() {
  talleres = null;
}