import { get, post,del } from "./http.js";

const BASE = "/workshops";
const BASE_IMAGENES = "/images";

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

export async function createTaller(data, archivoFoto = null) {
  let imagen = null;

  if (archivoFoto) {
    const formData = new FormData();
    formData.append("file", archivoFoto);
    imagen = await post(BASE_IMAGENES, formData); 
  }

  try {
    return await post(BASE, { ...data, photoUrl: imagen?.url ?? null });
  } catch (error) {
    if (imagen) {
      await del(`${BASE_IMAGENES}?publicId=${encodeURIComponent(imagen.publicId)}`)
        .catch(() => {});
    }
    throw error;
  }
}

export function putActualizarTaller(id, datos) {
  return put(`${BASE}/${id}`, datos);
}

export function deleteTaller(id) {
  return del(`${BASE}/${id}`);
}