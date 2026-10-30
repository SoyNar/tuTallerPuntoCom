let pendientes = 0;
let mostradoDesde = 0;
const MINIMO_MS = 500; // tiempo mínimo que se ve el overlay 

const MASCOTA_URL = new URL("../../assets/img/chispa-mascota-3.png", import.meta.url).href;

function inyectarEstilos() {
  if (document.getElementById("tt-loader-estilos")) return;
  const style = document.createElement("style");
  style.id = "tt-loader-estilos";

 style.textContent = `
  @keyframes tt-flotar { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes tt-parpadeo { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
  #overlay-cargando .tt-mascota {
    animation: tt-flotar 1.1s ease-in-out infinite;
    filter: drop-shadow(0 0 2px #fff) drop-shadow(0 0 2px #fff) drop-shadow(0 6px 10px rgba(0,0,0,.35));
  }
  #overlay-cargando .tt-rayo { animation: tt-parpadeo 0.8s ease-in-out infinite; }
  #overlay-cargando #overlay-cargando-texto { text-shadow: 0 1px 6px rgba(0,0,0,.45); }
  @media (prefers-reduced-motion: reduce) {
    #overlay-cargando .tt-mascota, #overlay-cargando .tt-rayo { animation: none; }
  }`;
  document.head.appendChild(style);
}

function obtenerOverlay() {
  let overlay = document.getElementById("overlay-cargando");
  if (overlay) return overlay;

  inyectarEstilos();
  overlay = document.createElement("div");
  overlay.id = "overlay-cargando";
  overlay.setAttribute("role", "status");
  overlay.setAttribute("aria-live", "polite");
  overlay.className = "d-flex flex-column align-items-center justify-content-center";
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 2000;
    background: rgba(14, 27, 61, 0.45);
    backdrop-filter: blur(2px);
    opacity: 0; visibility: hidden;
    transition: opacity .2s ease, visibility .2s ease;
  `;
  overlay.innerHTML = `
  <div class="d-flex flex-column align-items-center">
    <img class="tt-mascota" src="${MASCOTA_URL}" alt="" width="84" style="height:auto">
    <span class="fw-semibold text-white mt-3" id="overlay-cargando-texto">Cargando contenido...</span>
  </div>`;
  document.body.appendChild(overlay);
  return overlay;
}

/**
 * Metodo para usar cuando la vista debe cargar datos
 * modo de uso: llamar al metodo, escribir el mensaje 
 * @param {*} mensaje 
 */

export function mostrarCargando(mensaje = "Cargando contenido...") {
  pendientes++;
  const overlay = obtenerOverlay();
  overlay.querySelector("#overlay-cargando-texto").textContent = mensaje;
  if (pendientes === 1) mostradoDesde = performance.now();
  overlay.style.opacity = "1";
  overlay.style.visibility = "visible";
}
 /**
  * Este metodo debe usarse para ocultar el spinnner
  * por el contrario viendose siempre
  */
export function ocultarCargando() {
  pendientes = Math.max(0, pendientes - 1);
  if (pendientes > 0) return;

  const restante = Math.max(0, MINIMO_MS - (performance.now() - mostradoDesde));
  setTimeout(() => {
    if (pendientes > 0) return; // empezó otra carga mientras esperaba
    const overlay = document.getElementById("overlay-cargando");
    if (!overlay) return;
    overlay.style.opacity = "0";
    overlay.style.visibility = "hidden";
  }, restante);
}