import { recogerDatos } from "./formulario.js";
import { mostrarMapa } from "./mapa.js";
import { DAYS, STATUS, paintOptions } from "./options.js";
import { cargarServiciosCatalogo } from "./catalog-services.js";
import { activarValidaciones, limpiarValidaciones } from "./validaciones-wizard.js";
import { clearCover, fillPreview, initPhotos } from "./preview.js";
import { showToast } from "../../js/utils/toast-modal.js";
import { crearTaller } from "../../services/taller-service.js";

/**
 * wizard.js: lógica del modal "Agregar taller" con formulario de pasos.
 *
 * Inyecta con fetch el modal y los pasos (components/template/) y muestra
 * uno a la vez. Los pasos quedan en el DOM, así no se pierde lo escrito.
 * Requiere Bootstrap JS en la página.
 */

const TOTAL = 5;
let actual = 0;
let validadores = {}; // { indiceDePaso: [funciones validar] }

const base = new URL("../", import.meta.url);

async function cargarHTML(ruta) {
  const res = await fetch(new URL(ruta, base));
  if (!res.ok) throw new Error(`No se pudo cargar ${ruta} (${res.status})`);
  return res.text();
}

async function cargarPasos() {
  const body = document.getElementById("wizardBody");

  const htmls = await Promise.allSettled(
    Array.from({ length: TOTAL }, (_, i) =>
      cargarHTML(`template/modal-content${i + 1}.html`)
    )
  );

  htmls.forEach((r, i) => {
    const div = document.createElement("div");
    div.className = "paso d-none";
    div.innerHTML =
      r.status === "fulfilled"
        ? r.value
        : `<p class="text-danger">No se pudo cargar el paso ${i + 1}.</p>`;
    body.appendChild(div);
  });

  paintOptions("diasAtencion", DAYS, {
    name: "dias",
    idPrefix: "dia",
    labelClass: "wizard-dia",
  });

  paintOptions("estadoTaller", STATUS, {
    name: "estado",
    idPrefix: "estado",
    labelClass: "wizard-chip",
    type: "radio",
  });

  await cargarServiciosCatalogo();

  initPhotos();
  validadores = activarValidaciones();
  mostrarPaso(0);
}

/** Ejecuta todos los validadores del paso; muestra todas las alertas a la vez. */
function pasoEsValido(n) {
  return (validadores[n] ?? []).map((validar) => validar()).every(Boolean);
}

/**
 * Muestra el paso n y actualiza stepper, botones y texto "Paso X de N".
 */
function mostrarPaso(n) {
  actual = n;

  document
    .querySelectorAll("#wizardBody .paso")
    .forEach((p, i) => p.classList.toggle("d-none", i !== n));

  document.querySelectorAll("#wizardStepper .wizard-step").forEach((s, i) => {
    s.classList.toggle("active", i === n);
    s.classList.toggle("completed", i < n);
  });

  document.getElementById("wizardPasoTexto").textContent =
    `Paso ${n + 1} de ${TOTAL}`;
  document.getElementById("btnAtras").disabled = n === 0;
  document.getElementById("btnSiguiente").textContent =
    n === TOTAL - 1 ? "Guardar" : "Siguiente";

  if (n === 1) mostrarMapa();
  if (n === 4) fillPreview();
}

/** Reinicia el formulario, fotos y validaciones al guardar con éxito. */
function reiniciarWizard() {
  document.getElementById("formTaller")?.reset();
  clearCover();
  limpiarValidaciones();
  mostrarPaso(0);
}

/**
 * Crea el taller con sus horarios y servicios (POST /api/talleres).
 * Al terminar bien, avisa con el evento taller:guardado y cierra el modal.
 */
async function guardar() {
  const btn = document.getElementById("btnSiguiente");
  btn.disabled = true;

  try {
    const { datos, foto } = await recogerDatos();
    const taller = await crearTaller(datos, foto);

    showToast("Taller registrado correctamente.", "success");
    document.dispatchEvent(
      new CustomEvent("taller:guardado", { detail: taller })
    );

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("modalTaller")
    );
    modal?.hide();
    reiniciarWizard();
  } catch (error) {
    console.error("Error al guardar taller:", error);
    showToast(error.message, "danger");
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
  const modalContainer = document.getElementById("modalContainer");
  if (!modalContainer) {
    console.error("El contenedor #modalContainer no existe en esta página.");
    return;
  }

  try {
    modalContainer.innerHTML = await cargarHTML(
      "template/modal-container.html"
    );

    document
      .getElementById("btnSiguiente")
      .addEventListener("click", siguiente);
    document.getElementById("btnAtras").addEventListener("click", atras);
    document
      .getElementById("modalTaller")
      .addEventListener("show.bs.modal", cargarPasos, { once: true });
  } catch (error) {
    console.error("Fallo al cargar el modal:", error);
  }
}

iniciarWizard();