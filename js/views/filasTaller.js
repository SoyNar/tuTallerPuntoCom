import { escapar } from "../utils/formato.js";

const ESTADOS = {
  ACTIVO: { texto: "Activo", clase: "bg-success text-success" },
  PENDIENTE: { texto: "Pendiente", clase: "bg-warning text-warning-emphasis" },
  SUSPENDIDO: { texto: "Suspendido", clase: "bg-danger text-danger" },
};

const ICONO_TALLER = `<i class="bi bi-wrench text-secondary fs-5"></i>`;

// Las rutas del backend son relativas a la raíz; esta página vive en pages/
function fotoSrc(image) {
  if (!image) return null;
  if (/^(data:|https?:|\/)/.test(image)) return image;
  return `../${image}`;
}

function miniaturaHTML(t) {
  const src = fotoSrc(t.image);
  return src
    ? `<img src="${escapar(src)}" alt="" class="w-100 h-100 object-fit-cover" data-foto>`
    : ICONO_TALLER;
}

function accionesHTML(t) {
  // Solo lectura por ahora: el backend todavía no expone editar ni eliminar
  return "";
}

export function filaTallerHTML(t) {
  const estado = ESTADOS[t.garageStatus] ?? ESTADOS.PENDIENTE;
  const servicios = (t.services ?? [])
    .filter((s) => s.active)
    .map((s) => s.name)
    .join(", ");

  return `
    <tr>
      <td class="py-3">
        <div class="d-flex align-items-center">
          <div class="bg-table-img rounded overflow-hidden me-3 d-flex align-items-center justify-content-center flex-shrink-0"
               style="width: 48px; height: 48px;">
            ${miniaturaHTML(t)}
          </div>
          <div>
            <h6 class="mb-0 fw-bold">${escapar(t.name)}</h6>
            <small class="text-muted">ID ${escapar(String(t.id))}</small>
          </div>
        </div>
      </td>
      <td class="text-secondary">${escapar(t.address)}</td>
      <td class="text-secondary">${escapar(t.type ?? "") || "—"}</td>
      <td class="text-secondary">${escapar(servicios) || "—"}</td>
      <td>
        <span class="badge ${estado.clase} bg-opacity-25 rounded-pill px-3 py-2 fw-medium">${estado.texto}</span>
      </td>
      <td class="text-end text-nowrap">${accionesHTML(t)}</td>
    </tr>`;
}

// Si una foto no carga, vuelve el icono (el evento "error" no sube, por eso va en captura)
export function activarFallbackFotos(contenedor) {
  contenedor.addEventListener(
    "error",
    (e) => {
      if (e.target.matches("img[data-foto]")) e.target.outerHTML = ICONO_TALLER;
    },
    true,
  );
}