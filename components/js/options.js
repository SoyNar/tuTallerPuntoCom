import { serviciosCatalogo } from "../../js/data/catalogos.js";

/**
 * Pinta un grupo de checkboxes con estilo de botón.
 * @param {string} boxId  id del contenedor
 * @param {Array}  items  [{ value, label, title?, active? }]
 * @param {Object} cfg    { name, idPrefix, labelClass }
 */
export function paintOptions(boxId, items, { name, idPrefix, labelClass, type = 'checkbox' }) {
  const box = document.getElementById(boxId);
  if (!box) return;

  box.innerHTML = items.map(i => `
    <input type="${type}" class="btn-check" id="${idPrefix}-${i.value}"
           name="${name}" value="${i.value}" ${i.active ? 'checked' : ''}>
    <label class="btn ${labelClass}" for="${idPrefix}-${i.value}"
           ${i.title ? `title="${i.title}"` : ''}>${i.label}</label>
  `).join('');
}

export const DAYS = [
  { value: 'lunes',     label: 'L', title: 'Lunes',     active: true },
  { value: 'martes',    label: 'M', title: 'Martes',    active: true },
  { value: 'miercoles', label: 'X', title: 'Miércoles', active: true },
  { value: 'jueves',    label: 'J', title: 'Jueves',    active: true },
  { value: 'viernes',   label: 'V', title: 'Viernes',   active: true },
  { value: 'sabado',    label: 'S', title: 'Sábado' },
  { value: 'domingo',   label: 'D', title: 'Domingo' },
];

export const SERVICES =  serviciosCatalogo.map((s) => (
  { value: s.id, label: s.nombre }));
 


export const STATUS = [
    {value:'pendiente', label: 'Pendiente', active: true},
    {value:'activo', label: 'Activo'},
    {value:'suspendido', label: 'Suspendido'},
]