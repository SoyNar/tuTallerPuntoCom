// Transformas horas y minutos para realizar calculos de que hora es mayor

const pad = (n) => String(n).padStart(2, "0");
const aMinutos = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

// Obtener fecha actual (hora local)
export const fechaLocal = (d = new Date()) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// calcula la fecha de mañana - se utiliza en la validacion del formulario de reserva
export function fechaManana() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return fechaLocal(d);
}

// Transforma formato de fecha a un texto mas legible
export function fechaLegible(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

//Si la fecha es hoy, deshabilita las horas anteriores a la actual.
//si la hora elegida quedó deshabilitada, selecciona la primera disponible.
export function bloquearHorasPasadas(selectHora, fecha) {
  const ahora = new Date();
  const esHoy = fecha === fechaLocal(ahora);
  const minutosAhora = ahora.getHours() * 60 + ahora.getMinutes();

  for (const op of selectHora.options) {
    op.disabled = esHoy && aMinutos(op.value) < minutosAhora;
  }

  const libre = [...selectHora.options].find((op) => !op.disabled);
  if (libre && selectHora.selectedOptions[0].disabled)
    selectHora.value = libre.value;
  return Boolean(libre);
}
