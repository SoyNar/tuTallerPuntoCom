const KEY = "citas";
const ESTADO_CONFIRMADA = "confirmada";
const ESTADO_CANCELADA = "cancelada";
const EVENTO_CAMBIO = "citas:modificadas";

/** Avisa a quien escuche (la navbar) que las citas cambiaron. */
function notificarCambio(tipo, cita) {
  window.dispatchEvent(
    new CustomEvent(EVENTO_CAMBIO, { detail: { tipo, cita } })
  );
}

/** Guarda el arreglo completo. Devuelve true/false según si se pudo. */
function persistir(citas) {
  try {
    localStorage.setItem(KEY, JSON.stringify(citas));
    return true;
  } catch (e) {
    console.error("No se pudo guardar en localStorage", e);
    return false;
  }
}

/**
 * Devuelve todas las citas (cualquier estado). Siempre un arreglo:
 * [] si no hay citas o si lo guardado está dañado.
 */
export async function obtenerCitas() {
  try {
    const citas = JSON.parse(localStorage.getItem(KEY)) ?? [];
    return Array.isArray(citas) ? citas : [];
  } catch (e) {
    console.error("Error al obtener las citas", e);
    return [];
  }
}

/** Citas ordenadas de la más antigua a la más reciente (fecha + hora). */
export async function citasOrdenadas() {
  const citas = await obtenerCitas();
  return [...citas].sort((a, b) =>
    `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`)
  );
}

/**
 * Crea una cita. `data` NO trae id, estado ni reprogramada.
 * @returns {Promise<Object|null>} la cita creada, o null si falló
 */
export async function guardarCita(data) {
  const citas = await obtenerCitas();

  const nueva = {
    ...data,
    id: Date.now(),              
    estado: ESTADO_CONFIRMADA,
    reprogramada: false,
  };

  citas.push(nueva);
  if (!persistir(citas)) return null;

  notificarCambio("creada", nueva);
  return nueva;
}

/**
 * Reprograma una cita: cambia SOLO fecha y hora. El estado sigue "confirmada".
 * @param {number|string} id
 * @param {{fecha: string, hora: string}} nuevo
 * @returns {Promise<Object|null>} la cita actualizada, o null si no existe,
 *   está cancelada o no se pudo guardar
 */
export async function reprogramarCita() {
  
}

/**
 * Cancela una cita: cambia el estado a "cancelada" (no la borra).
 * @returns {Promise<Object|null>} la cita actualizada, o null si no existe
 *   o no se pudo guardar
 */
export async function cancelarCita(id) {
  const citas = await obtenerCitas();
  const cita = citas.find((c) => c.id === Number(id));
  if (!cita) return null;

  cita.estado = ESTADO_CANCELADA;
  if (!persistir(citas)) return null;

  notificarCambio("cancelada", cita);
  return cita;
}

/** Cantidad de citas confirmadas (el contador de la navbar). */
export async function contarCitasActivas() {
  const citas = await obtenerCitas();
  return citas.filter((c) => c.estado === ESTADO_CONFIRMADA).length;
}