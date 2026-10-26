import { guardarTaller } from "../../services/talleres-service.js";
import { recogerDatos } from "./formulario.js";
import { mostrarMapa } from "./mapa.js";
import {paintOptions, STATUS} from "./options.js"
import { DAYS } from "./options.js";
import { SERVICES } from "./options.js";
import { validateField, validateGroup } from "../../js/utils/GeneralValidatorForm.js";
import { clearCover, fillPreview, initPhotos} from "./preview.js";

/**
 * wizard.js: lógica del modal "Agregar taller" con formulario de pasos.
 *
 * Inyecta con fetch el modal y los pasos (components/template/) y muestra
 * uno a la vez. Los pasos quedan en el DOM, así no se pierde lo escrito.
 * Mapa en mapa.js, lectura y validación de horarios en formulario.js,
 * validaciones de campos en validaciones.js, guardado en
 * services/talleres-service.js. Requiere Bootstrap JS en la página.
 */

const TOTAL = 5;
let actual = 0;
const validadores = {};   // { indiceDePaso: [funciones validar] }

const base = new URL('../', import.meta.url);

async function cargarHTML(ruta) {
  const res = await fetch(new URL(ruta, base));
  if (!res.ok) throw new Error(`No se pudo cargar ${ruta} (${res.status})`);
  return res.text();
}

async function cargarPasos() {
  const body = document.getElementById('wizardBody');

  const htmls = await Promise.allSettled(
    Array.from({ length: TOTAL }, (_, i) => cargarHTML(`template/modal-content${i + 1}.html`))
  );

  htmls.forEach((r, i) => {
    const div = document.createElement('div');
    div.className = 'paso d-none';
    div.innerHTML = r.status === 'fulfilled'
      ? r.value
      : `<p class="text-danger">No se pudo cargar el paso ${i + 1}.</p>`;
    body.appendChild(div);
  });
 paintOptions('diasAtencion', DAYS, { name: 'dias', idPrefix: 'dia', labelClass: 'wizard-dia' });
 paintOptions('serviciosTaller', SERVICES, { name: 'servicios', idPrefix: 'srv', labelClass: 'wizard-chip' });
paintOptions('estadoTaller', STATUS, {
  name: 'estado', idPrefix: 'est', labelClass: 'wizard-chip', type: 'radio'
});
initPhotos()
  activarValidaciones();   
  mostrarPaso(0);
}

/**
 * Engancha los validadores a los campos de cada paso (una sola vez).
 * Los índices empiezan en 0: 0 Datos, 1 Ubicación, 2 Horarios y servicios...
 */
function activarValidaciones() {
  validadores[0]  = [
    validateField('#tallerNombre', ['required',['min',3],['max',20],'noCode']),
    validateField('#tallerNit',['required',['digits',[9,15]]]),
    validateField('#tallerTelefono',['required','phone']),
    validateField('#tallerCorreo',['required','email']),
   
  ].filter(Boolean);

  validadores[1] = [
     validateField('#taller-direccion',['required',['min',5],['max',100],'noCode']),
    validateField('#taller-ciudad',['required',['min',4], ['max',100],'noCode']),

  ]

 validadores[2] = [
  validateGroup('#diasAtencion', 'dias', 1, 'Selecciona al menos un día.'),
  validateField('[name="cierre"]', [['later', '[name="apertura"]']],
                { later: 'La hora de cierre debe ser posterior a la de apertura.' }),
  validateGroup('#serviciosTaller', 'servicios', 1, 'Elige al menos un servicio.'),
].filter(Boolean);

  validadores[3] = [
    validateGroup('#estadoTaller','estado',1,'Elige al menos un estado'),
    // validatePhoto({ required: true }),
  ].filter(Boolean)
}

/** Ejecuta todos los validadores del paso; muestra todas las alertas a la vez. */
function pasoEsValido(n) {
  return (validadores[n] ?? []).map(validar => validar()).every(Boolean);
}

/** Quita alertas y bordes de validación (al cerrar tras guardar). */
function limpiarValidaciones() {
  document.querySelectorAll('#wizardBody .alerta-validacion').forEach(a => a.remove());
  document.querySelectorAll('#wizardBody .border-warning, #wizardBody .border-success')
    .forEach(el => el.classList.remove('border', 'border-warning', 'border-success'));
}

/**
 * Muestra el paso n y actualiza stepper, botones y texto "Paso X de N".
 */
function mostrarPaso(n) {
  actual = n;

  document.querySelectorAll('#wizardBody .paso')
    .forEach((p, i) => p.classList.toggle('d-none', i !== n));

  document.querySelectorAll('#wizardStepper .wizard-step').forEach((s, i) => {
    s.classList.toggle('active', i === n);
    s.classList.toggle('completed', i < n);
  });

  document.getElementById('wizardPasoTexto').textContent = `Paso ${n + 1} de ${TOTAL}`;
  document.getElementById('btnAtras').disabled = n === 0;
  document.getElementById('btnSiguiente').textContent =
    n === TOTAL - 1 ? 'Guardar' : 'Siguiente';

  if (n === 1) mostrarMapa();
  if(n === 4) fillPreview();
}

async function guardar() {
  const btn = document.getElementById('btnSiguiente');
  btn.disabled = true;

  try {
    await guardarTaller( await recogerDatos());

    bootstrap.Modal.getInstance(document.getElementById('modalTaller')).hide();
    document.getElementById('formTaller').reset();
    clearCover()    
    limpiarValidaciones();
    mostrarPaso(0);
  } catch (error) {
    console.error(error);
  } finally {
    btn.disabled = false;
  }
}

async function siguiente() {
  if (!pasoEsValido(actual)) return;   
  if (actual < TOTAL - 1) mostrarPaso(actual + 1);
  else await guardar();
}

function atras() {
  if (actual > 0) mostrarPaso(actual - 1);
}

async function iniciarWizard() {

    const modalContainer = document.getElementById('modalContainer');
    if(!modalContainer){
      console.error("Modal  no existe aun en esta pagina")
      return;
    }
  try {
    // Inyectar el contenedor del modal
  
    
   modalContainer.innerHTML = await cargarHTML('template/modal-container.html');


    // Ya existe en el DOM: enlazar todo
    document.getElementById('btnSiguiente').addEventListener('click', siguiente);
    document.getElementById('btnAtras').addEventListener('click', atras);
    document.getElementById('modalTaller')
      .addEventListener('show.bs.modal', cargarPasos, { once: true });
  } catch (error) {
    console.error("Fallo al cargar el modal: ",error);
  }
}

iniciarWizard();