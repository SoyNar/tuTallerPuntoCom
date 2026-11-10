import { estaAutenticado, EVENTO_SESION } from "../../services/auth-service.js";

/**
 * Muestra u oculta elementos según la sesión.
 * data-requiere-sesion: visible solo con sesión
 * data-solo-anonimo: visible solo sin sesión
 */
export function aplicarVisibilidadSesion(raiz = document) {
  const logueado = estaAutenticado();

  raiz.querySelectorAll("[data-requiere-sesion]")
    .forEach((el) => el.classList.toggle("d-none", !logueado));

  raiz.querySelectorAll("[data-solo-anonimo]")
    .forEach((el) => el.classList.toggle("d-none", logueado));
}

/** Mantiene la visibilidad sincronizada cuando cambia la sesión. */
export function activarVisibilidadSesion(raiz = document) {
  const actualizar = () => aplicarVisibilidadSesion(raiz);
  actualizar();
  window.addEventListener(EVENTO_SESION, actualizar);
  return () => window.removeEventListener(EVENTO_SESION, actualizar);
}