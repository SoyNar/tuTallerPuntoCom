import { confirmarEliminar } from "../../components/js/confirm-modal.js";
import { eliminarTaller, mergeTalleres } from "../../services/talleres-service.js";
import { crearFiltros, filtrarLista, normalizar } from "../utils/filtros.js";
import { mostrarCargando, ocultarCargando } from "../utils/loader.js";
import { crearPaginador } from "../utils/paginator.js";
import { showToast } from "../utils/toast-modal.js";
import { filaTallerHTML, activarFallbackFotos } from "../views/filasTaller.js";

const tbody = document.getElementById("filas-tabla");
let talleres = [];

// una regla por filtro: (taller, valor) => ¿cumple?
const reglas = {
  texto: (t, v) =>
    normalizar(`${t.nombre} ${t.nit} ${t.direccion} ${t.ciudad}`).includes(normalizar(v)),
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

async function  cargarTalleres() 
{
  mostrarCargando("Cargando datos.....");
  try{
    talleres = await mergeTalleres();
    renderizarTabla();

  }catch(error) {
    console.error("Error al obterner talleres", error);
  }finally{
    ocultarCargando();
  }

  
}


function renderizarTabla() {
  const lista = filtrarLista(talleres, filtros.valores(), reglas);
  const pagina = paginador.paginar(lista);

  tbody.innerHTML = pagina.length
    ? pagina.map(filaTallerHTML).join("")
    : `<tr><td colspan="6" class="text-center text-secondary py-5">No hay talleres para mostrar.</td></tr>`;
}

tbody.addEventListener("click", async (e) => {
  const boton = e.target.closest("[data-eliminar]");
  if (!boton) return;

  const taller = talleres.find((t) => t.id === Number(boton.dataset.eliminar));
  if (!(await confirmarEliminar(`"${taller?.nombre}"`))) return;
  try{

  await eliminarTaller(boton.dataset.eliminar);
  talleres  = await mergeTalleres();
  renderizarTabla();
  showToast("Taller eliminado exitosamente",'success');
  }catch(e) {
    console.error("eror al eliminar el taller",e)
    showToast("Error al eliminar el taller", "error")
  }
});

document.addEventListener("taller:guardado", cargarTalleres);
activarFallbackFotos(tbody);
cargarTalleres();