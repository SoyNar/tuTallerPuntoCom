import { obtenerServiciosTaller } from "../data/catalogos.js";
import { escapar, legible } from "../utils/formato.js";

const ESTADOS = {
  activo: { texto: "Activo", clase: "bg-success text-success" },
  pendiente: { texto: "Pendiente", clase: "bg-warning text-warning-emphasis" },
  suspendido: { texto: "Suspendido", clase: "bg-danger text-danger" },
};

const ICONO_TALLER = `<i class="bi bi-wrench text-secondary fs-5"></i>`;

// las rutas del mock son relativas a la raíz; esta página vive en pages/
function fotoSrc(foto) {
  if (!foto || foto === "pendiente") return null;
  if (/^(data:|https?:|\/)/.test(foto)) return foto;
  return `../${foto}`;
}

function miniaturaHTML(t) {
  const src = fotoSrc(t.foto);
  return src
    ? `<img src="${escapar(src)}" alt="" class="w-100 h-100 object-fit-cover" data-foto>`
    : ICONO_TALLER;
}

function accionesHTML(t) {
  if (t.esBase) return ""; 
  return `
    <button type="button" class="btn btn-link p-0 text-decoration-none fs-5 me-3"
            data-editar="${t.id}" title="Editar taller" aria-label="Editar taller">
      <i class="bi bi-pencil-square"></i>
    </button>
    <button type="button" class="btn btn-link p-0 text-decoration-none fs-5 text-danger"
            data-eliminar="${t.id}" title="Eliminar taller" aria-label="Eliminar taller">
      <i class="bi bi-trash"></i>
    </button>`;
}

export function filaTallerHTML(t) {
  const estado = ESTADOS[t.estado] ?? ESTADOS.pendiente;
  const servicios = obtenerServiciosTaller(t).map((s) => s.nombre).join(", ");

  return `
    <tr>
      <td class="py-3">
        <div class="d-flex align-items-center">
          <div class="bg-table-img rounded overflow-hidden me-3 d-flex align-items-center justify-content-center flex-shrink-0"
               style="width: 48px; height: 48px;">
            ${miniaturaHTML(t)}
          </div>
          <div>
            <h6 class="mb-0 fw-bold">${escapar(t.nombre)}</h6>
            <small class="text-muted">NIT ${escapar(t.nit)}</small>
          </div>
        </div>
      </td>
      <td class="text-secondary">${escapar(t.direccion)}, ${escapar(legible(t.ciudad))}</td>
      <td class="text-secondary">${escapar(legible(t.tipoVehiculos)) || "—"}</td>
      <td class="text-secondary">${escapar(servicios)}</td>
      <td>
        <span class="badge ${estado.clase} bg-opacity-25 rounded-pill px-3 py-2 fw-medium">${estado.texto}</span>
      </td>
      <td class="text-end text-nowrap">${accionesHTML(t)}</td>
    </tr>`;
}

// si una foto no carga, vuelve el icono (el evento "error" no sube, por eso va en captura)
export function activarFallbackFotos(contenedor) {
  contenedor.addEventListener(
    "error",
    (e) => {
      if (e.target.matches("img[data-foto]")) e.target.outerHTML = ICONO_TALLER;
    },
    true,
  );
}