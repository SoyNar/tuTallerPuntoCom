import {
  getPaginaTalleres,
  createTaller,
  putActualizarTaller,
  deleteTaller,
} from "../js/api/taller.api.js";

let talleres = null;
let pendiente = null;

export function obtenerTalleres({ forzar = false } = {}) {
  if (talleres && !forzar) return Promise.resolve(talleres);

  if (!pendiente) {
    pendiente = getPaginaTalleres({ page: 0, size: 1000 })
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

export async function obtenerTallerPorId(id) {
  const lista = await obtenerTalleres();
  return lista.find((t) => String(t.id) === String(id));
}

export async function crearTaller(datos) {
  const resultado = await createTaller(datos);
  cambioRealizado("creado", resultado);
  return resultado;
}

export async function actualizarTaller(id, datos) {
  const resultado = await putActualizarTaller(id, datos);
  cambioRealizado("actualizado", resultado);
  return resultado;
}

export async function eliminarTaller(id) {
  await deleteTaller(id);
  cambioRealizado("eliminado", { id });
}

/** Punto único después de cualquier escritura: invalida y avisa. */
function cambioRealizado(accion, taller) {
  invalidarTalleres();
  document.dispatchEvent(
    new CustomEvent("taller:guardado", { detail: { accion, taller } }),
  );
}

export function invalidarTalleres() {
  talleres = null;
}