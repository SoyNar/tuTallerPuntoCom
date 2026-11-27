import { aplicarVisibilidadSesion } from "../js/utils/session-ui.js";
import { estaAutenticado, cerrarSesion, EVENTO_SESION } from "../services/auth-service.js";
import { getUsuarioActual, invalidarCache } from "../js/api/user.api.js"; // ajusta la ruta

const iniciales = (u) =>
  [u?.name, u?.lastname]
    .filter(Boolean)
    .map((p) => p.trim()[0])
    .join("")
    .toUpperCase();

async function pintar(raiz) {
  const haySesion = estaAutenticado();

  // 1) Lo que no necesita datos, al instante
  raiz.querySelector("[data-invitado]")?.classList.toggle("d-none", haySesion);
  raiz.querySelector("[data-usuario]")?.classList.toggle("d-none", !haySesion);
  raiz.querySelector("[data-agenda]")?.classList.toggle("d-none", !haySesion);
  if (!haySesion) return;

  // 2) Los datos del usuario, cuando lleguen
  let usuario;
  try {
    usuario = await getUsuarioActual();
  } catch {
    return; // si falla (ej. 401), el manejo de sesión vencida va en request/auth-service
  }

  const spanIniciales = raiz.querySelector("[data-usuario-iniciales]");
  const nombre = raiz.querySelector("[data-usuario-nombre]");

  if (spanIniciales) {
    spanIniciales.textContent = iniciales(usuario);
    spanIniciales.classList.remove("d-none");
  }
  raiz.querySelector("[data-usuario-foto]")?.classList.add("d-none");

  if (nombre) {
    nombre.textContent = [usuario.name, usuario.lastname].filter(Boolean).join(" ");
  }
}

export function autenticar(raiz) {
  const actualizar = () => {
    pintar(raiz);
    aplicarVisibilidadSesion(raiz);
  };

  // otra pestaña cambió el token: la caché de esta ya no vale
  const alStorage = () => {
    invalidarCache();
    actualizar();
  };

  const alCerrar = () => cerrarSesion();
  const btnCerrar = raiz.querySelector("[data-cerrar-sesion]");

  actualizar();

  btnCerrar?.addEventListener("click", alCerrar);
  window.addEventListener(EVENTO_SESION, actualizar);
  window.addEventListener("storage", alStorage);

  return () => {
    btnCerrar?.removeEventListener("click", alCerrar);
    window.removeEventListener(EVENTO_SESION, actualizar);
    window.removeEventListener("storage", alStorage);
  };
}