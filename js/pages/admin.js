import { confirmarEliminar } from "../../components/js/confirm-modal.js";
import {
  eliminarTaller,
  mergeTalleres,
} from "../../services/talleres-service.js";
import { crearFiltros, filtrarLista, normalizar } from "../utils/filtros.js";
import { crearPaginador } from "../utils/paginator.js";
import { filaTallerHTML, activarFallbackFotos } from "../views/filasTaller.js";

const tbody = document.getElementById("filas-tabla");

// una regla por filtro: (taller, valor) => ¿cumple?
const reglas = {
  texto: (t, v) =>
    normalizar(`${t.nombre} ${t.nit} ${t.direccion} ${t.ciudad}`).includes(
      normalizar(v),
    ),
  estado: (t, v) => t.estado === v,
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
  const lista = filtrarLista(mergeTalleres(), filtros.valores(), reglas);
  const pagina = paginador.paginar(lista);

  tbody.innerHTML = pagina.length
    ? pagina.map(filaTallerHTML).join("")
    : `<tr><td colspan="6" class="text-center text-secondary py-5">No hay talleres para mostrar.</td></tr>`;
}

tbody.addEventListener("click", async (e) => {
  const boton = e.target.closest("[data-eliminar]");
  if (!boton) return;

  const taller = mergeTalleres().find(
    (t) => t.id === Number(boton.dataset.eliminar),
  );
  if (!(await confirmarEliminar(`"${taller?.nombre}"`))) return;

  eliminarTaller(boton.dataset.eliminar);
  renderizarTabla();
});

document.addEventListener("taller:guardado", renderizarTabla);
activarFallbackFotos(tbody);
renderizarTabla();
