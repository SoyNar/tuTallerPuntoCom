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

// guardar una nueva cita y agregarla al localStorage
export function guardarCita(datos) {
  const nueva = { id: Date.now(), estado: "pendiente", ...datos };
  const citas = obtenerCitas();

  citas.push(nueva);
  localStorage.setItem(KEY, JSON.stringify(citas));
  document.dispatchEvent(new CustomEvent("cita:guardada", { detail: nueva }));

  return nueva;
}
