import { usuariosFake, correosFake } from "../data/usuarios-fake.js";
const KEY = 'usuarios';
const KEY_VEHICULOS = 'vehiculos';


export async function guardarUsuario(payload) {
  const guardados = JSON.parse(localStorage.getItem(KEY)) ?? [];

  if (guardados.some(u => u.correo === payload.correo)) {
    throw new Error('Ya existe una cuenta con ese correo');
  }

  const { vehiculos = [], ...datosUsuario } = payload;
  const id = crypto.randomUUID();

  const usuario = { id, ...datosUsuario, rol: 'cliente' };
  guardados.push(usuario);
  localStorage.setItem(KEY, JSON.stringify(guardados));

  const todosVehiculos = JSON.parse(localStorage.getItem(KEY_VEHICULOS)) ?? [];
  vehiculos.forEach((v, i) => {
    todosVehiculos.push({
      id: `${id}-${i}`,
      usuario_id: id,
      tipo: v.tipo,
      marca: v.marca ?? '',
      modelo: v.modelo ?? '',
      placa: v.placa,
    });
  });
  localStorage.setItem(KEY_VEHICULOS, JSON.stringify(todosVehiculos));

  const { clave, ...usuarioPublico } = usuario;
  return { usuario: usuarioPublico, token: 'fake-token' };
}

/**
 * Validar credenciales de un usuario
 */
export async function validarCredenciales(correo, clave) {
  await new Promise((r) => setTimeout(r, 800));
  const guardados = JSON.parse(localStorage.getItem(KEY)) ?? [];
  const correoBuscado = correo.trim().toLowerCase();

  const encontrado = guardados.find(
    (u) => u.correo.toLowerCase() === correoBuscado && u.clave === clave
  );

  if (!encontrado) return null;

  const { clave: _omitida, ...usuarioPublico } = encontrado;
  return usuarioPublico;
} 

export function sembrarUsuariosDemo() {
  const guardados = JSON.parse(localStorage.getItem(KEY)) ?? [];
  const correosExistentes = new Set(guardados.map(u => u.correo));

  const faltantes = usuariosFake
    .map((u, i) => ({
      id: u.id,
      nombre: u.nombre,
      apellido: u.apellido,
      correo: correosFake[i],
      clave: u.contrasenia,
      rol: u.rol || 'cliente',
    }))
    .filter(u => !correosExistentes.has(u.correo));

  if (!faltantes.length) return;
  localStorage.setItem(KEY, JSON.stringify([...guardados, ...faltantes]));
}