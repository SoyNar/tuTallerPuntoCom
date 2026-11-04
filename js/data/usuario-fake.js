// Vehículos registrados en el sistema (catálogo simulado)}
import {obtenerUsuario} from "../../services/auth-service.js"
export const vehiculosCatalogo = [
  { id: 7, usuario_id: 12, tipo: "Automóvil", marca: "Mazda", modelo: "3", placa: "ABC123" },
  { id: 8, usuario_id: 12, tipo: "Moto",  marca: "Yamaha", modelo: "FZ 150", placa: "XYZ45F" },
  { id: 9, usuario_id: 30, tipo: "Automóvil", marca: "Renault", modelo: "Duster", placa: "QWE987" },
];

// Usuario simulado: guarda ids de sus vehículos
export const usuarioMock = {
  id: 12,
  nombre: "JOhana Bedoya",
  apellido: "Gómez Hernandez",
  foto: "",
  direccion: "Calle 12 # 43E-49, Medellín",
  vehiculos: [7, 8],
};

export function obtenerVehiculosUsuario(usuario) {
  const ids = usuario?.vehiculos ?? [];
  return vehiculosCatalogo.filter((v) => ids.includes(v.id));
}

/**
 * Simulación de peticion de vehiculos al backend 
 * @returns 
 */
export async function obtenerMisVehiculos() {
  const usuario = obtenerUsuario();          // simula "el backend lee la sesión"
  if (!usuario) return [];                   
  return vehiculosCatalogo.filter((v) => v.usuario_id === usuario.id);
}