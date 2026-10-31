const  KEY = "citas";
const  ESTADO_CONFIRMADA = "confirmada";
const ESTADO_CANCELADA = "cancelada";


/**
 * Devuelve todas las citas guardadas (cualquier estado).
 *
 * En localStorage se guardan con la clave "citas", como un arreglo directo:
 * [ { ...cita }, { ...cita } ]
 *
 * Cada cita tiene esta forma:
 * {
 *   id: 1793470001234,          // lo asigna guardarCita al crearla
 *   taller_id: 4,
 *   usuario_id: 12,
 *   servicio_id: 4,
 *   vehiculo_id: 7,
 *   fecha: "2026-04-25",
 *   hora: "10:30:00",
 *   costo_aproximado: 40000,    // número, sin separadores
 *   estado: "confirmada",       // "confirmada" | "cancelada"
 *   reprogramada: false         // true si se cambió fecha u hora
 * }
 *
 * Siempre devuelve un arreglo: [] si no hay citas o si lo guardado está dañado.
 * Para crear una cita no se manda `id`, `estado` ni `reprogramada`.
 *
 * @returns {Promise<Array<Object>>} todas las citas
 */
 export  async function obtenerCitas(){
    try {
    const citas = JSON.parse(localStorage.getItem(KEY)) ?? [];
    return Array.isArray(citas) ? citas : [];

    }catch(e) {
        console.error("Error al obtener la cista", e);
        return [];
    }
    
}

/**
 * Confirma (crea) una cita.
 *
 * Por ahora guarda en localStorage (clave "citas"). Cuando exista el backend
 * solo cambia el interior de esta función; quien la llame no cambia.
 *
 * Dispara el evento "citas:changed" en window al terminar de guardar. La navbar
 * lo escucha para recalcular el contador de citas confirmadas.
 *
 * @param {Object} data datos de la cita, SIN id, estado ni reprogramada:
 *   { taller_id, usuario_id, servicio_id, vehiculo_id, fecha, hora, costo_aproximado }
 * @returns {Promise<Object|null>} la cita completa (con id, estado "confirmada"
 *   y reprogramada false), o null si no se pudo guardar
 */
   export async function guardarCita(data)
{
    const citas = await obtenerCitas();

    const nueva = {
        id: Date.now(),
        ...data,
        estado: ESTADO_CONFIRMADA,
        reprogramada:false
    }
    citas.push(nueva);
    try{
        localStorage.setItem(KEY,JSON.stringify(citas));
    }catch(e) {
        console.error("Error al crear una cita");
        return null;
    }

    // aqui disparo el evento, este es el que eschua la nav
    //para enterarse que se acaba de confirmar una cita 
    window.dispatchEvent(new Event("citas:changed"))
    return nueva;
}

/**
 * MEtodo para reprogramar una cita
 * Reprogramar una cita indica editar solamente fecha y hora
 * el estado sigue igual (Estado: confirmada)
 * 
 */
export function reprogramarCita(){

}

export  async function contarCitasActivas() {

    
    const allCitas = await obtenerCitas();
     return allCitas.filter((c) => c.estado === ESTADO_CONFIRMADA).length; 
   }


/**
 * Cancela una cita: cambia su estado a "cancelada" (no la borra, queda en el historial).
 * Dispara "citas:changed" al terminar.
 *
 * @param {number|string} id id de la cita
 * @returns {Promise<Object|null>} la cita actualizada, o null si no existe o no se pudo guardar
 */
export async function cancelarCita(id){
    const citas = await obtenerCitas();
    const cita  = citas.find((c) => c.id === Number(id))
    if(!cita) return null;
    cita.estado = ESTADO_CANCELADA;
    try{
        localStorage.setItem(KEY,JSON.stringify(citas));
    }catch(e){
        console.error("No se pudo cancelar la cita");
        return null;
    }
    window.dispatchEvent(new Event("citas:changed"))
    return cita;
    //disparar evento citas:changed

}