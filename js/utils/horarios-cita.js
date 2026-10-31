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
