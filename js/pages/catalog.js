import { renderizarTalleres } from "../utils/renderCardsGarages.js";
import { fetchTalleres } from "../../services/garageService.js";
import {
  llenarSelect,
  crearFiltros,
  filtrarLista,
  normalizar,
} from "../utils/filtros.js";

const contenedor = document.getElementById("filtros-talleres");
const servicioSelect = document.getElementById("servicioSelect");
const ciudadSelect = document.getElementById("ciudadSelect");
const vehiculoSelect = document.getElementById("vehiculoSelect");

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
    (taller?.servicios ?? []).some((servicio) =>
      normalizar(servicio).includes(normalizar(valor)),
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
  try {
    talleresDisponibles = await fetchTalleres();

    const servicios = obtenerOpcionesUnicas(talleresDisponibles, "servicios");
    const ciudades = obtenerOpcionesUnicas(talleresDisponibles, "ciudad");
    const vehiculos = obtenerOpcionesUnicas(talleresDisponibles, "tipoVehiculos");

    llenarSelect(servicioSelect, servicios, "Todos");
    llenarSelect(ciudadSelect, ciudades, "Todas");
    llenarSelect(vehiculoSelect, vehiculos.length ? vehiculos : ["Automóvil", "Moto"], "Todos");

    renderizarTalleres(filtrarLista(talleresDisponibles, filtros.valores(), reglas));
  } catch (error) {
    console.error("Error al obtener los talleres:", error);
  }
}

document.addEventListener("DOMContentLoaded", obtenerTalleres);
