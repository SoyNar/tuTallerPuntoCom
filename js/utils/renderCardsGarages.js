import { estaAbiertoElTaller } from "./scheduleCalculator.js";

const FOTO_DEFECTO = "../assets/img/chispa-mascota-3.png"

// Función para renderizar las tarjetas en el HTML
export function renderizarTalleres(lista) {
  const contenedor = document.getElementById("contenedor-talleres");
  contenedor.innerHTML = ""; // Limpia el contenedor previo

  lista.forEach((taller) => {
    const col = document.createElement("div");
    const foto = taller.foto || FOTO_DEFECTO;
    // Clases
    col.className = "col col-12 col-md-6 col-lg-4";
    if (!taller.horarios) console.warn("Taller sin horarios:", taller);


    // Generamos los badges de servicios dinámicamente
    const badgesServicios = taller.servicios ?? []
      .map(
        (servicio) =>
          `<span class="badge bg-light text-dark border me-1">${servicio}</span>`,
      ).join("");
        const { apertura, cierre, dias } = taller.horarios ?? {};
    const horarioHabilitado =  apertura &&  cierre  ? estaAbiertoElTaller(apertura,cierre,dias) : false


    col.innerHTML = 
    `<div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                
                <div
                  class="border-bottom"
                  style="height: 160px; background-color: #e2e8f0"
                  >
                  <img
                  src="${foto}"
                  alt="${taller.nombre}"
                  loading="lazy" decoding="async"
                  class="w-100 h-100"
                  style="object-fit: cover"
                  />
                  </div>
              

                <div class="card-body p-3">
                  <div
                    class="d-flex justify-content-between align-items-center mb-1"
                  >
                    <h3 class="card-title h6 fw-bold mb-0">${taller.nombre}</h3>
                    <span
                      class="badge text-white px-3 py-1 rounded-3 ${ horarioHabilitado ? "bg-primary" : "bg-secondary"}"
                      style="background-color: #2563eb; font-size: 0.75rem"
                      > ${horarioHabilitado ? "Abierto" : "Cerrado"} </span
                    >
                  </div>
                  <p class="small mb-2 text-secondary">
                    ${taller.ciudad} - ${taller.direccion}
                  </p>
                  <div class="d-flex gap-1 mb-3">
                  ${badgesServicios}
                  </div>
                  <div class="d-flex gap-2">
                    <button
                      class="btn btn-outline-secondary btn-sm w-50 fw-semibold rounded-3 py-2"
                    >
                      Cotizar
                    </button>
                    <button
                      class="btn btn-tt-accent btn-sm w-50 fw-semibold rounded-3 py-2"
                    >
                      Agendar
                    </button>
                  </div>
                </div>
              </div>
            </div>`
      ;

    contenedor.appendChild(col);
  });
}