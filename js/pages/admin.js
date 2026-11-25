import { obtenerTalleres } from "../../services/taller-service.js";
import { crearFiltros, filtrarLista, normalizar } from "../utils/filtros.js";
import { crearPaginador } from "../utils/paginator.js";
import { filaTallerHTML, activarFallbackFotos } from "../views/filasTaller.js";

const tbody = document.getElementById("filas-tabla");

let talleres = [];

const reglas = {
  texto: (t, v) =>
    normalizar(`${t.name} ${t.address} ${t.type}`).includes(normalizar(v)),
  estado: (t, v) => t.status === v,
};

const paginador = crearPaginador({
  porPagina: 5,
  contenedor: document.getElementById("paginacion"),
  alCambiar: renderizarTabla,
  flechas: false,
});

const filtros = crearFiltros({
  contenedor: document.getElementById("filtros-talleres"),
  modo: "vivo",
  alCambiar: () => {
    paginador.reiniciar();
    renderizarTabla();
  },
});

function renderizarTabla() {
  const lista = filtrarLista(talleres, filtros.valores(), reglas);
  const pagina = paginador.paginar(lista);

  tbody.innerHTML = pagina.length
    ? pagina.map(filaTallerHTML).join("")
    : `<tr><td colspan="6" class="text-center text-secondary py-5">No hay talleres para mostrar.</td></tr>`;
}

async function cargar() {
  talleres = await obtenerTalleres();
  renderizarTabla();
}

document.addEventListener("taller:guardado", () => {
  cargar();
});

activarFallbackFotos(tbody);
cargar();