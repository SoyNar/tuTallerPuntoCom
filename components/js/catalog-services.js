import { get } from "../../js/api/http.js";

/**
 * Trae el catálogo de servicios de la API y pinta los checkboxes en #serviciosTaller.
 */
export async function cargarServiciosCatalogo() {
  const contenedor = document.getElementById("serviciosTaller");
  if (!contenedor) return;

  try {
    const pagina = await get("/services?size=100");
    const servicios = pagina.content ?? pagina;

    contenedor.replaceChildren();

    servicios.forEach((s) => {
      const id = `srv${s.id}`;

      const input = document.createElement("input");
      input.type = "checkbox";
      input.className = "btn-check";
      input.name = "servicios";
      input.id = id;
      input.value = s.id;
      input.dataset.price = s.price;

      const label = document.createElement("label");
      label.className = "wizard-chip";
      label.htmlFor = id;
      label.textContent = s.name;

      contenedor.append(input, label);
    });
  } catch (error) {
    console.error("No se pudieron cargar los servicios:", error);
    contenedor.innerHTML =
      '<p class="text-danger">No se pudieron cargar los servicios.</p>';
  }
}