import { mergeTalleres } from '../../services/talleres-service.js';

const TALLERES = mergeTalleres();

export function renderizarCitas(listaDeCitas, contendorId) {
  const contenedor = document.getElementById(contendorId);
  contenedor.innerHTML = ""
  
  if (listaDeCitas.length === 0) {
    const pCitasVacias = document.createElement("p")
    pCitasVacias.className = "text-muted small text-center my-4"
    pCitasVacias.textContent = "No hay citas en esta categoría."
    return contenedor.appendChild(pCitasVacias)
  }

  listaDeCitas.forEach((cita) => {
    const col = document.createElement("div")
    const fecha = new Date(cita.fecha + "T" + cita.hora)
    const mes = fecha.toLocaleString("es-ES", { month: "short" })
    const dia = fecha.getDate()
    const hora = fecha.toLocaleString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: true })
    const taller = TALLERES.find(taller => taller.id === cita.taller_id)

    col.className = "card border-0 rounded-3 shadow-sm p-3 mb-2 bg-white text-dark"

    col.innerHTML = `
            <div class="row g-0 align-items-center">
                <div class="col-3 text-center border-end border-2 pe-2">
                    <span class="text-uppercase text-muted fw-bold d-block x-small" style="font-size: 0.75rem;">${mes}</span>
                    <span class="fs-4 fw-bold text-dark d-block">${dia}</span>
                </div>
                <div class="col-9 ps-3">
                <div class="d-flex justify-content-between align-items-start mb-1">
                    <h6 class="fw-bold mb-0 text-truncate small" style="max-width: 65%;">${taller.nombre}</h6>
                    <span class="badge rounded-pill bg-success-subtle text-success x-small" style="font-size: 0.65rem;">${cita.estado}</span>
                </div>
                    <p class="mb-1 text-muted x-small" style="font-size: 0.75rem;"><i class="bi bi-wrench me-1"></i> ${taller.servicios[cita.servicio_id]} · ${cita.vehiculo_id}</p>
                    <p class="mb-0 text-muted x-small" style="font-size: 0.75rem;"><i class="bi bi-clock me-1"></i> ${hora}</p>
            </div>
                    
    `;

    contenedor.appendChild(col);
  });
}
