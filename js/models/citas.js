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
 * Cita tal como la usa el front (convertida desde el JSON del backend en citas-service).
 * @property {number} id
 * @property {number} taller_id
 * @property {string} taller_nombre      garageName
 * @property {number} servicio_id
 * @property {string} servicio_nombre    serviceName
 * @property {number} vehiculo_id
 * @property {string} vehiculo_placa     vehiclePlate
 * @property {string} fecha              YYYY-MM-DD
 * @property {string} hora               HH:mm
 * @property {"pendiente"|"confirmada"|"cancelada"} estado
 * @property {boolean} reprogramada
 */

/**
 * @typedef {{ok: true, cita: Cita} | {ok: false, motivo: string}} ResultadoCita
 */