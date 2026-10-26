// Función para renderizar las tarjetas en el HTML
export function renderizarTalleres(lista) {
  const contenedor = document.getElementById("contenedor-talleres");
  contenedor.innerHTML = ""; // Limpia el contenedor previo

  lista.forEach((taller) => {
    const col = document.createElement("div");
    col.className = "col";

    // Generamos los badges de servicios dinámicamente
    const badgesServicios = taller.servicios
      .map(
        (servicio) =>
          `<span class="badge bg-light text-dark border me-1">${servicio}</span>`,
      )
      .join("");

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <!-- Imagen del taller -->
        <div class="card-img-top bg-light border-bottom d-flex align-items-center justify-content-center overflow-hidden" style="height: 180px;">
          ${
            taller.imagen
              ? `<img src="${taller.imagen}" alt="${taller.nombre}" class="w-100 h-100 object-fit-cover">`
              : `<span class="text-muted small">Foto del taller</span>`
          }
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h3 class="card-title h6 fw-bold mb-0">${taller.nombre}</h3>
            <span class="badge ${taller.estado === "Abierto" ? "bg-primary" : "bg-secondary"}">${taller.estado}</span>
          </div>
          <p class="card-text small text-body-secondary mb-3">
            <i class="bi bi-star-fill text-warning"></i> ${taller.calificacion} &bull; ${taller.distancia}
          </p>
          <!-- Etiquetas de servicios -->
          <div class="mb-3">
            ${badgesServicios}
          </div>
          <!-- Botones de acción con dataset para asociar el ID -->
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-outline-secondary btn-sm w-50 btn-cotizar" data-taller-id="${taller.id}">
              Cotizar
            </button>
            <button type="button" class="btn btn-primary btn-sm w-50 btn-agendar" data-taller-id="${taller.id}">
              Agendar
            </button>
          </div>
        </div>
      </div>
    `;

    contenedor.appendChild(col);
  });
}