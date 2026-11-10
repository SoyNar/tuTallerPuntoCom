// Vehículos registrados en el sistema (catálogo simulado)}
import {obtenerUsuario} from "../../services/auth-service.js"
import { usuariosFake } from "../data/usuarios-fake.js";
import { vehiculosCatalogo } from "../data/vehiculos-fake.js";


// Usuario simulado: guarda ids de sus vehículos
export const usuarioMock = usuariosFake[0]

export function obtenerVehiculosUsuario(usuario) {
  const ids = usuario?.vehiculos ?? [];
  return vehiculosCatalogo.filter((v) => ids.includes(v.id));
}

/**
 * Simulación de peticion de vehiculos al backend 
 * @returns 
 */
export async function obtenerMisVehiculos() {
  const usuario = obtenerUsuario();
  if (!usuario) return [];

  const propios = JSON.parse(localStorage.getItem('vehiculos')) ?? [];
  return [...vehiculosCatalogo, ...propios].filter(
    (v) => String(v.usuario_id) === String(usuario.id)
  );
}