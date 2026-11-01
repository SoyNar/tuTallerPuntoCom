/**
 * Lo que el front ENVÍA al crear una cita.
 * @typedef {Object} CitaRequest
 * @property {number} taller_id
 * @property {number} servicio_id
 * @property {number} vehiculo_id
 * @property {string} fecha              YYYY-MM-DD
 * @property {string} hora               HH:mm:ss
 * @property {number} costo_aproximado
 */

/**
 * 
 * @typedef {Object} Cita
 * @property {number} id
 * @property {number} taller_id
 * @property {number} usuario_id
 * @property {number} servicio_id
 * @property {number} vehiculo_id
 * @property {string} fecha
 * @property {string} hora
 * @property {number} costo_aproximado
 * @property {"confirmada"|"cancelada"} estado
 * @property {boolean} reprogramada
 */

/**
 * @typedef {{ok: true, cita: Cita} | {ok: false, motivo: string}} ResultadoCita
 */