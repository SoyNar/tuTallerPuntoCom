import { renderizarTalleres } from "../utils/renderCardsGarages.js";
import { fetchTalleres } from "../../services/garageService.js";
import { mostrarCargando, ocultarCargando } from "../utils/loader.js";


async function obtenerTalleres() {
    // mostrarCargando("Cargando su Solicitud...");
  try {
    const talleres = await fetchTalleres().then(talleres => talleres.slice(0,3))
    //Devuelve solo tres talleres
    // Reemplaza esta URL por la endpoint real de tu API cuando la tengas
    // const respuesta = await fetch("https://api.tutaller.com/talleres");
    // const listaTalleres = await respuesta.json();

    // Por el momento simulamos la carga con el array de prueba:
    renderizarTalleres(talleres);
  } catch (error) {
    console.error("Error al obtener los talleres:", error);
  }finally{
    ocultarCargando();
  }
}

// Ejecutar la carga al cargar el DOM
document.addEventListener("DOMContentLoaded", obtenerTalleres);
