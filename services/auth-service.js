import { guardarUsuario } from "../js/views/api-fake.js";
import { validarCredenciales } from "../js/views/api-fake.js";

const url = (ruta) => new URL(ruta, import.meta.url).href;
const KEY_SESION = "sesion";
const LOGIN_URL = url("../pages/login.html");
export const EVENTO_SESION = "sesion:actualizada";
const RUTAS = {
 cliente: url("../index.html"),
  admin: url("../pages/admin.html"),
}
/**
 * metodo para redirigir a un usuario a la pagina correspondiente segun su rol
 * @param {string} rol 
 */
export function redirigirPorRol(rol)
{
   window.location.href = RUTAS[rol];
}

/**
 * Metodo para registrar un usuario
 * @param {object} usuario 
 * @returns 
 */
export async function registrar(payload) {
  const { usuario, token } = await guardarUsuario(payload);
  localStorage.setItem('token', token);
  iniciarSesion(usuario);
  return usuario;
}

/** Devuelve { usuario } si hay sesión válida, o null. */
export function obtenerSesion() {
  try {
    const sesion = JSON.parse(localStorage.getItem(KEY_SESION));
    return sesion?.usuario?.id ? sesion : null;
  } catch {
    return null;
  }
}

export const obtenerUsuario = () => obtenerSesion()?.usuario ?? null;
export const estaAutenticado = () => obtenerSesion() !== null;


export function iniciarSesion(usuario) {
  localStorage.setItem(KEY_SESION, JSON.stringify({ usuario }));
  window.dispatchEvent(new CustomEvent(EVENTO_SESION));
}

/**
 * metodo para simular el login de un usuario
 * cuando haya backend esto lo hara el backend
 * @param {string} correo
 * @param {string} clave
 * @returns 
 */
export async function login({ correo, clave }) {
  const usuario = await validarCredenciales(correo, clave);

  if (!usuario) {
    throw new Error('Correo o contraseña incorrectos');
  }

  localStorage.setItem('token', 'fake-token');
  iniciarSesion(usuario);
  return usuario;
}

/**
 * MEtodo para cerrar sesion
 * borra la key del localstorage
 */
export function cerrarSesion() {
  localStorage.removeItem(KEY_SESION);
  window.dispatchEvent(new CustomEvent(EVENTO_SESION));
}