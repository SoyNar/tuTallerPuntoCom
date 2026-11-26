import { get, post, patch } from "./http.js";

// TODO: confirmar rutas con el AppointmentController del backend
const BASE = "/appointments";

/**
 * Arma el query string de una página.
 * @param {{page?: number, size?: number, status?: string}} opciones
 */
function paramsPagina({ page = 0, size = 20, status } = {}) {
  const params = new URLSearchParams({ page, size });
  if (status) params.set("status", status);
  return params;
}

/**
 * Página de citas del usuario autenticado (lo identifica el token).
 * Respuesta: { content: [...], page, size, totalElements, totalPage, last }
 */
export function getMisCitas(opciones) {
  return get(`${BASE}/me?${paramsPagina(opciones)}`);
}

/**
 * Página de TODAS las citas (uso general / admin).
 * @param {{page?: number, size?: number, status?: "PENDIENTE"|"CONFIRMADA"|"CANCELADA"}} opciones
 */
export function getCitas(opciones) {
  return get(`${BASE}?${paramsPagina(opciones)}`);
}

/**
 * Crea una cita.
 * @param {{garageId: number, serviceId: number, vehicleId: number, date: string, hour: string}} data
 */
export function postCita(data) {
  return post(BASE, data);
}

/**
 * Cambia la fecha y hora de una cita.
 * @param {number|string} id
 * @param {{date: string, hour: string}} fechaHora
 */
export function patchReprogramar(id, fechaHora) {
  return patch(`${BASE}/${id}/reschedule`, fechaHora);
}

/** Cancela una cita (cambia su estado, no la borra). */
export function patchCancelar(id) {
  return patch(`${BASE}/${id}/cancel`);
}
