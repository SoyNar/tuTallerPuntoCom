const KEY = 'usuarios';

export async function guardarUsuario(payload) {
  const guardados = JSON.parse(localStorage.getItem(KEY)) ?? [];

  if (guardados.some(u => u.correo === payload.correo)) {
    throw new Error('Ya existe una cuenta con ese correo');
  }

  const usuario = {
    id: crypto.randomUUID(),
    ...payload,
    rol: 'cliente',
  };

  guardados.push(usuario);
  localStorage.setItem(KEY, JSON.stringify(guardados));

  const { clave, ...usuarioPublico } = usuario;
  return { usuario: usuarioPublico, token: 'fake-token' };
}