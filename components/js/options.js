import {
  DAYS as DAY_VALUES,
  CATEGORY_SERVICES,
  GARAGE_STATUS,
} from "../../js/data/enums.js";

/**
 * Pinta un grupo de checkboxes o radios con estilo de botón.
 * @param {string} boxId  id del contenedor
 * @param {Array}  items  [{ value, label, title?, active? }]
 * @param {Object} cfg    { name, idPrefix, labelClass, type? }
 */
export function paintOptions(boxId, items, { name, idPrefix, labelClass, type = "checkbox" }) {
  const box = document.getElementById(boxId);
  if (!box) return;

  box.innerHTML = items
    .map(
      (i) => `
    <input type="${type}" class="btn-check" id="${idPrefix}-${i.value}"
           name="${name}" value="${i.value}" ${i.active ? "checked" : ""}>
    <label class="btn ${labelClass}" for="${idPrefix}-${i.value}"
           ${i.title ? `title="${i.title}"` : ""}>${i.label}</label>
  `,
    )
    .join("");
}

// Días: value = enum del backend, label = letra para el botón
const DAY_LABELS = {
  LUNES:     { label: "L", title: "Lunes" },
  MARTES:    { label: "M", title: "Martes" },
  MIERCOLES: { label: "X", title: "Miércoles" },
  JUEVES:    { label: "J", title: "Jueves" },
  VIERNES:   { label: "V", title: "Viernes" },
  SABADO:    { label: "S", title: "Sábado" },
  DOMINGO:   { label: "D", title: "Domingo" },
};

const DIAS_ACTIVOS_POR_DEFECTO = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"];

export const DAYS = DAY_VALUES.map((value) => ({
  value,
  ...DAY_LABELS[value],
  active: DIAS_ACTIVOS_POR_DEFECTO.includes(value),
}));

// Categorías de servicio
const SERVICE_LABELS = {
  MECANICA_GENERAL:     "Mecánica general",
  ELECTRONICA:          "Electrónica",
  LATONERIA_PINTURA:    "Latonería y pintura",
  EQUIPAMENTO_VEHICULO: "Equipamiento del vehículo",
};

export const SERVICES = CATEGORY_SERVICES.map((value) => ({
  value,
  label: SERVICE_LABELS[value],
}));

// Estado del taller
const STATUS_LABELS = {
  ACTIVO:     "Activo",
  PENDIENTE:  "Pendiente",
  SUSPENDIDO: "Suspendido",
};

export const STATUS = GARAGE_STATUS.map((value) => ({
  value,
  label: STATUS_LABELS[value],
  active: value === "PENDIENTE",
}));