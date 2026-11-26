import {
  getMisCitas,
  getCitas,
  postCita,
  patchReprogramar,
  patchCancelar,
} from "../js/api/citas-api.js";
import { estaAutenticado } from "./auth-service.js";

export const ESTADOS = Object.freeze({
  PENDIENTE: "pendiente",
  CONFIRMADA: "confirmada",
  CANCELADA: "cancelada",
});
const EVENTO_CAMBIO = "citas:modificadas";
const TAMANO_PAGINA = 100;

/** Avisa a quien escuche (la navbar, el modal) que las citas cambiaron. */
function notificarCambio(tipo, cita) {
  window.dispatchEvent(
    new CustomEvent(EVENTO_CAMBIO, { detail: { tipo, cita } })
  );
}

/** Una cita sigue vigente si no está cancelada (pendiente o confirmada). */
export const esActiva = (cita) => cita.estado !== ESTADOS.CANCELADA;

/**
 * Backend -> front. Deja la cita con la forma que usan renderCitas y modalCitas.
 * @returns {Cita}
 */
function aFront(c) {
  return {
    id: c.id,
    taller_id: c.garageId,
    taller_nombre: c.garageName ?? "",
    servicio_id: c.serviceId,
    servicio_nombre: c.serviceName ?? "",
    vehiculo_id: c.vehicleId,
    vehiculo_placa: c.vehiclePlate ?? "",
    fecha: c.date,                    // "YYYY-MM-DD"
    hora: c.hour?.slice(0, 5),        // "09:30:00" -> "09:30" (el <select> usa HH:mm)
    estado: c.status?.toLowerCase(),  // "PENDIENTE" -> "pendiente"
    reprogramada: Boolean(c.reschedule), // el listado no lo trae: queda false
  };
}

/**
 * Front -> backend.
 * @param {CitaRequest} d
 */
function aBack(d) {
  return {
    garageId: Number(d.taller_id),
    serviceId: Number(d.servicio_id),
    vehicleId: Number(d.vehiculo_id),
    date: d.fecha,
    hour: d.hora,
  };
}

/**
 * Recorre todas las páginas de un endpoint paginado y junta el `content`.
 * @param {(opciones: {page: number, size: number}) => Promise<any>} pedirPagina
 */
async function traerTodasLasPaginas(pedirPagina, filtros = {}) {
  const todas = [];
  let page = 0;
  let ultima = false;

  while (!ultima) {
    const data = await pedirPagina({ ...filtros, page, size: TAMANO_PAGINA });
    const lista = Array.isArray(data) ? data : data?.content ?? [];
    todas.push(...lista);
    // Si la respuesta no es paginada o no trae `last`, se corta en la primera vuelta.
    ultima = Array.isArray(data) || data?.last !== false || lista.length === 0;
    page++;
  }
  return todas.map(aFront);
}

/**
 * Citas del usuario en sesión (cualquier estado). Siempre un arreglo:
 * [] si no hay sesión, no hay citas o falló la petición.
 */
export async function obtenerCitas() {
  if (!estaAutenticado()) return []; // evita el 401 en páginas sin sesión
  try {
    return await traerTodasLasPaginas(getMisCitas);
  } catch (e) {
    console.error("Error al obtener las citas del usuario", e);
    return [];
  }
}

/**
 * Listado general de citas (todas, de todos los usuarios). Pensado para admin.
 * @param {{estado?: "pendiente"|"confirmada"|"cancelada"}} filtros
 * @returns {Promise<Cita[]>} [] si falló la petición
 */
export async function obtenerTodasLasCitas({ estado } = {}) {
  try {
    const status = estado?.toUpperCase();
    return await traerTodasLasPaginas(getCitas, status ? { status } : {});
  } catch (e) {
    console.error("Error al obtener el listado general de citas", e);
    return [];
  }
}

/** Ordena de la más antigua a la más reciente (fecha + hora). */
export function ordenarCitas(citas) {
  return [...citas].sort((a, b) =>
    `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`)
  );
}

/** Citas del usuario ordenadas de la más antigua a la más reciente. */
export async function citasOrdenadas() {
  return ordenarCitas(await obtenerCitas());
}

/**
 * Crea una cita. `data` NO trae id, estado ni reprogramada (los pone el backend).
 * @param {CitaRequest} data
 * @returns {Promise<Object|null>} la cita creada, o null si falló
 */
export async function guardarCita(data) {
  try {
    const nueva = aFront(await postCita(aBack(data)));
    notificarCambio("creada", nueva);
    return nueva;
  } catch (e) {
    console.error("Error al crear la cita", e);
    return null;
  }
}

/**
 * Reprograma una cita: cambia SOLO fecha y hora.
 * @param {number|string} id
 * @param {{fecha: string, hora: string}} nuevo
 * @returns {Promise<Object|null>} la cita actualizada, o null si falló
 */
export async function reprogramarCita(id, { fecha, hora } = {}) {
  if (!fecha || !hora) return null;
  try {
    const cita = aFront(await patchReprogramar(id, { date: fecha, hour: hora }));
    notificarCambio("reprogramada", cita);
    return cita;
  } catch (e) {
    console.error("Error al reprogramar la cita", e);
    return null;
  }
}

/**
 * Cancela una cita: cambia el estado a "cancelada" (no la borra).
 * @returns {Promise<Object|null>} la cita actualizada, o null si falló
 */
export async function cancelarCita(id) {
  try {
    const cita = aFront(await patchCancelar(id));
    notificarCambio("cancelada", cita);
    return cita;
  } catch (e) {
    console.error("Error al cancelar la cita", e);
    return null;
  }
}

/** Cantidad de citas vigentes (pendientes + confirmadas): el contador de la navbar. */
export async function contarCitasActivas() {
  const citas = await obtenerCitas();
  return citas.filter(esActiva).length;
}
