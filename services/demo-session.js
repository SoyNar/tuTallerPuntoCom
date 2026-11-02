import { obtenerSesion, iniciarSesion } from "./auth-service.js";
import { usuarioMock } from "../js/data/usuario-fake.js";

// Pon en false cuando exista el login real.
export const MODO_DEMO = true;

const KEY_DEMO = "demo-sesion-creada";

/**
 * SIMULACION: deja un usuario autenticado por defecto para quien prueba la app.
 * Solo lo hace la primera vez, para que "Cerrar sesión" funcione y no se
 * vuelva a iniciar sola al recargar.
 */
export function iniciarSesionDemo() {
  if (!MODO_DEMO) return;
  if (obtenerSesion()) return;                    // ya hay sesión
  if (localStorage.getItem(KEY_DEMO)) return;     // ya se creó antes y la cerraron

  iniciarSesion(usuarioMock);
  localStorage.setItem(KEY_DEMO, "1");
}