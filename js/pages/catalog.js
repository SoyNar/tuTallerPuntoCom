import { renderizarTalleres } from "../utils/renderCardsGarages.js";
import {
  llenarSelect,
  crearFiltros,
  filtrarLista,
  normalizar,
} from "../utils/filtros.js";
import { mergeTalleres } from "../../services/talleres-service.js";
import { mostrarCargando, ocultarCargando } from "../utils/loader.js";
import { serviciosCatalogo } from "../data/serviciosCatalogo.js";
import { obtenerServiciosTaller } from "../data/serviciosCatalogo.js";

const contenedor = document.getElementById("filtros-talleres");
const servicioSelect = document.getElementById("servicioSelect");
const ciudadSelect = document.getElementById("ciudadSelect");
const vehiculoSelect = document.getElementById("vehiculoSelect");
const contenedorTalleres = document.getElementById("contenedor-talleres");

let talleresDisponibles = [];

const reglas = {
  texto: (taller, valor) => {
    const buscador = [
      taller?.nombre,
      taller?.ciudad,
      taller?.direccion,
      ...(taller?.servicios ?? []),
      ...(Array.isArray(taller?.tipoVehiculos)
        ? taller.tipoVehiculos
        : [taller?.tipoVehiculos].filter(Boolean)),
    ]
      .join(" ")
      .trim();

    return normalizar(buscador).includes(normalizar(valor));
  },
  
  servicio: (taller, valor) =>
   obtenerServiciosTaller(taller).some((info) => 
    
       normalizar(info.nombre).includes(normalizar(valor)) ||
      normalizar(info.categoria).includes(normalizar(valor))

    
    ),

  ciudad: (taller, valor) => normalizar(taller?.ciudad ?? "") === normalizar(valor),
  
  vehiculo: (taller, valor) => {
    const tipos = Array.isArray(taller?.tipoVehiculos)
      ? taller.tipoVehiculos
      : [taller?.tipoVehiculos].filter(Boolean);

    if (!tipos.length) return true;

    return tipos.some((tipo) => normalizar(tipo).includes(normalizar(valor)));
  },
};

function obtenerOpcionesUnicas(lista, clave) {
  const valores = lista
    .flatMap((item) => {
      const valor = item?.[clave];
      if (Array.isArray(valor)) return valor;
      if (valor) return [valor];
      return [];
    })
    .filter(Boolean)
    .map((valor) => String(valor).trim())
    .filter((valor) => valor.length > 0);

  return [...new Set(valores)].sort((a, b) => a.localeCompare(b));
}

const filtros = crearFiltros({
  contenedor,
  modo: "vivo",
  alCambiar: () => {
    renderizarTalleres(filtrarLista(talleresDisponibles, filtros.valores(), reglas));
  },
});


async function obtenerTalleres() {
  mostrarCargando("Cargando Talleres...");
  try {
    talleresDisponibles = await mergeTalleres();

    const servicios = [...new Set(serviciosCatalogo.map((s) => s.categoria ))]
    const ciudades = obtenerOpcionesUnicas(talleresDisponibles, "ciudad");
    const vehiculos = obtenerOpcionesUnicas(talleresDisponibles, "tipoVehiculos");

    llenarSelect(servicioSelect, servicios, "Todos");
    llenarSelect(ciudadSelect, ciudades, "Todas");
    llenarSelect(vehiculoSelect, vehiculos.length ? vehiculos : ["Automóvil", "Moto"], "Todos");

    renderizarTalleres(filtrarLista(talleresDisponibles, filtros.valores(), reglas));
  } catch (error) {
    console.error("Error al obtener los talleres:", error);
  } finally {
    ocultarCargando();
  }
}

/**
 * abrir el modal de agendar cita
 * aqui mismo se usan los datos de talleresDisponibles para llenar los datos en el modal
 */
contenedorTalleres.addEventListener("click", (e) => {
  const btnAgendar = e.target.closest(".btn-agendar");
  
  if (btnAgendar) {
    const modalElement = document.getElementById("modalCita");
    
    if (window.bootstrap && window.bootstrap.Modal) {
      const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modalElement);
      modalInstance.show();
    }
  }
});

document.addEventListener("DOMContentLoaded", obtenerTalleres);