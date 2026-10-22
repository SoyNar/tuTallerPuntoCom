import { guardarTaller } from "../../services/talleres-service.js";
import { recogerDatos } from "./formulario.js";
import { mostrarMapa } from "./mapa.js";

/**
 * wizard.js: este archivo contiene la logica de modal "Agregar taller" con formulario de pasos.
 *
 * Inyecta con fetch el modal y los pasos (components/template/) y muestra
 * uno a la vez. Los pasos quedan en el DOM, así no se pierde lo escrito.
 * Mapa en mapa.js, lectura y validación en formulario.js, guardado en
 * services/talleres-service.js. Requiere Bootstrap JS en la página.
 */

const TOTAL = 5;
let actual = 0;
const datos = {}; 

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
      div.innerHTML = r.status === 'fulfilled' ? r.value : `<p class="text-danger">No se pudo cargar el paso ${i +1}.</p>`;
      body.appendChild(div);
    });
    mostrarPaso(0);

}
/***
 * funcion para mostrar los pasos en el form
 */

function mostrarPaso(n) {
  actual = n;
  document.querySelectorAll('#wizardBody .paso')
    .forEach((p, i) => p.classList.toggle('d-none', i !== n));
  document.querySelectorAll('#wizardStepper .wizard-step').forEach((s, i) => 
    {
    s.classList.toggle('active', i === n);
    s.classList.toggle('completed', i < n);
  });
  document.getElementById('btnAtras').disabled = n === 0;
  document.getElementById('btnSiguiente').textContent =
    n === TOTAL - 1 ? 'Guardar' : 'Siguiente';

    if(n === 1) mostrarMapa()
}

async function guardar() {
  const btn = document.getElementById('btnSiguiente');
  btn.disabled = true;

  try {
    await guardarTaller(recogerDatos())

    bootstrap.Modal.getInstance(document.getElementById('modalTaller')).hide();
    document.getElementById('formTaller').reset();
    mostrarPaso(0);
  } catch (error) {
    console.error(error);
  } finally {
    btn.disabled = false;
  }
}

  async function siguiente() {
  if (actual < TOTAL - 1) mostrarPaso(actual + 1);
  else await guardar()
}

function atras() {
  if (actual > 0) mostrarPaso(actual - 1);
}

async function iniciarWizard() {
  try {
    // Inyectar el contenedor del modal
    document.getElementById('modalContainer').innerHTML =
      await cargarHTML('template/modal-container.html');

    // existe en el DOM: enlazar todo
    document.getElementById('btnSiguiente').addEventListener('click', siguiente);
    document.getElementById('btnAtras').addEventListener('click', atras);
    document.getElementById('modalTaller')
      .addEventListener('show.bs.modal', cargarPasos, { once: true });
  } catch (error) {
    console.error(error);
  }
}

iniciarWizard();