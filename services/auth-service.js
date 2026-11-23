import { loginBackend, registerUser } from "../js/api/auth-api.js";

const url = (ruta) => new URL(ruta, import.meta.url).href;
const KEY_SESION = "sesion";
const KEY_TOKEN = "token";
export const EVENTO_SESION = "sesion:actualizada";

const RUTAS = {
  CLIENTE: url("../index.html"),
  ADMIN: url("../pages/admin.html"),
};

/**
 * Redirige al usuario a la página según su rol.
 * @param {string} rol  "CLIENTE" | "ADMIN"
 */
export function redirigirPorRol(rol) {
  window.location.href = RUTAS[rol] ?? RUTAS.CLIENTE;
}

/**
 * Registra un usuario y guarda la sesión.
 * @param {object} payload  name, lastname, email, phone, password, address, vehicle
 */
export async function registrar(payload) {
  const body = {
    name: payload.name,
    lastname: payload.lastname || null,
    email: payload.email,
    phone: payload.phone,
    password: payload.password,
    address: payload.address,
    vehicles: payload.vehicles,
  };

  const { token, user } = await registerUser(body);
  guardarSesion(token, user);
  return user;
}

/**
 * Inicia sesión y guarda la sesión.
 * @param {{ correo: string, clave: string }} credenciales
 */
export async function login({ correo, clave }) {
  const { token, user } = await loginBackend({ email: correo, password: clave });
  guardarSesion(token, user);
  return user;
}

/** Cierra la sesión y borra el token. */
export function cerrarSesion() {
  localStorage.removeItem(KEY_SESION);
  localStorage.removeItem(KEY_TOKEN);
  window.dispatchEvent(new CustomEvent(EVENTO_SESION));
}

/** Devuelve la sesión si es válida, o null. */
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
export const obtenerToken = () => localStorage.getItem(KEY_TOKEN);

function guardarSesion(token, usuario) {
  localStorage.setItem(KEY_TOKEN, token);
  localStorage.setItem(KEY_SESION, JSON.stringify({ usuario }));
  window.dispatchEvent(new CustomEvent(EVENTO_SESION));
}