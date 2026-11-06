import { guardarUsuario } from "../js/views/api-fake.js";


const KEY_SESION = "sesion";
export const EVENTO_SESION = "sesion:actualizada";
const KEY_DEMO = "demo-sesion-creada";
const RUTAS = {
  cliente: '/index.html',
  admin:'/pagesadmin.html',
}
/**
 * metodo para redirigir a un usuario a la pagina correspondiente segun su rol
 * @param {string} rol 
 */
export function redirigirPorRol(rol)
{
   window.location.href = RUTAS[rol] ?? '/pages/login.html';
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



/**
 * Metodo para simular la autenticación de un usuario
 * guarda la info del usuario en el localstorage
 * cuando haya backend esto lo hara el backend
 * @param {object} usuario 
 */
export function iniciarSesion(usuario) {
  localStorage.setItem(KEY_SESION, JSON.stringify({ usuario }));
  window.dispatchEvent(new CustomEvent(EVENTO_SESION));
}

/**
 * MEtodo para cerrar sesion
 * borra la key del localstorage
 */
export function cerrarSesion() {
  localStorage.removeItem(KEY_SESION);
  localStorage.removeItem(KEY_DEMO); //esta es de prueba
  window.dispatchEvent(new CustomEvent(EVENTO_SESION));
}