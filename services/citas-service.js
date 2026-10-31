const KEY = "citas";

// Recupera las citas agendadas desde el localStorage
export function obtenerCitas() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
}
