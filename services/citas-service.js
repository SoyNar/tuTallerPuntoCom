const KEY = "citas";

// Recupera las citas agendadas desde el localStorage
export function obtenerCitas() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
}

// Ordena de las mas antigua a la mas reciente por su fecha y hora
export function citasOrdenadas() {
  return obtenerCitas().sort((a, b) =>
    `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`),
  );
}
