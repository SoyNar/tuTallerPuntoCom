// Transformas horas y minutos para realizar calculos de que hora es mayor

const pad = (n) => String(n).padStart(2, "0");
const aMinutos = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
