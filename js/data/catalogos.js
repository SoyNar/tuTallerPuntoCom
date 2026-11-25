import { obtenerTalleres } from "../../services/taller-service.js";
import { renderizarTalleres } from "../../js/utils/renderCardsGarages.js";

async function iniciar() {
  try {
    const talleres = await obtenerTalleres();
    renderizarTalleres(talleres);
  } catch (err) {
    console.error("No se pudieron cargar los talleres:", err);
  }
}

iniciar();