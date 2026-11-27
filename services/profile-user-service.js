import { getUsuarioActual } from "../js/api/user.api.js";

const TIPOS = { MOTO: "Moto", CARRO: "Carro" }; // ajusta a tu enum real

export function etiquetaVehiculo(v) {
  return `${v.brand} ${v.model} · ${v.plate}`;
}

/**
 * Vehículos del usuario autenticado (vienen dentro de /users/me)
 */
export async function obtenerMisVehiculos() {
  const usuario = await getUsuarioActual();
  return (usuario?.vehicles ?? []).map((v) => ({
    ...v,
    nombre: etiquetaVehiculo(v),
    tipo: TIPOS[v.typeVehicle] ?? v.typeVehicle,
  }));
}