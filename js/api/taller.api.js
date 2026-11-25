import { get } from "./http.js";

const BASE = "/workshops";

/** Página de talleres del servidor. */
export function getPaginaTalleres({ page = 0, size = 6, status } = {}) {
  const params = new URLSearchParams({ page, size });
  if (status) params.set("status", status);
  return get(`${BASE}?${params}`);
}

/** Taller por id desde el servidor (sin caché). */
export function getTallerPorId(id) {
  return get(`${BASE}/${id}`);
}

/**
 * 
 * metodo para crear un taller  debe invalidar el caché
 * @param {object} data 
 * @returns 
 */
export function createTaller(data){
      return post(BASE, data);
}

export function putActualizarTaller(id, datos) {
  return put(`${BASE}/${id}`, datos);
}

export function deleteTaller(id) {
  return del(`${BASE}/${id}`);
}