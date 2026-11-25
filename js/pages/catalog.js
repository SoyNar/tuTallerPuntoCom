import { renderizarTalleres } from "../utils/renderCardsGarages.js";
import { crearFiltros, normalizar } from "../utils/filtros.js";
import { getPaginaTalleres } from "../../js/api/taller.api.js";
import { mostrarCargando, ocultarCargando } from "../utils/loader.js";
import { crearPaginador } from "../utils/paginator.js";

const contenedorTalleres = document.getElementById("contenedor-talleres");

const POR_PAGINA = 6;
let paginaActual = 0;
let filtroTexto = "";
let visiblesActuales = [];

const paginator = crearPaginador({
  porPagina: POR_PAGINA,
  contenedor: document.getElementById("paginacion"),
  info: document.getElementById("infoPaginacion"),
  alCambiar: () => {
    paginaActual = paginator.paginaActual();
    cargarPagina();
    contenedorTalleres.scrollIntoView({ behavior: "smooth", block: "start" });
  },
});

async function cargarPagina() {
  mostrarCargando("Cargando Talleres...");
  try {
    const data = await getPaginaTalleres({ page: paginaActual, size: POR_PAGINA, status: "ACTIVO" });

    // Filtro de texto solo sobre la página recibida
    visiblesActuales = data.content.filter((t) =>
      normalizar(`${t.name} ${t.address} ${t.city} ${t.typeVehicle}`).includes(
        normalizar(filtroTexto),
      ),
    );

    renderizarTalleres(visiblesActuales);
    paginator.actualizar({
      pagina: data.page,
      totalPaginas: data.totalPage,
      totalElementos: data.totalElements,
    });
  } catch (error) {
    console.error("Error al obtener los talleres:", error);
  } finally {
    ocultarCargando();
  }
}

const filtros = crearFiltros({
  contenedor: document.getElementById("filtros-talleres"),
  modo: "vivo",
  alCambiar: () => {
    filtroTexto = filtros.valores().texto ?? "";
    paginaActual = 0;
    cargarPagina();
  },
});

contenedorTalleres.addEventListener("click", (e) => {
  const btnAgendar = e.target.closest(".btn-agendar");
  if (!btnAgendar) return;

  const taller = visiblesActuales.find(
    (t) => String(t.id) === btnAgendar.dataset.tallerId,
  );
  if (taller) document.querySelector("agendar-cita-modal")?.abrir(taller);
});

document.addEventListener("DOMContentLoaded", cargarPagina);