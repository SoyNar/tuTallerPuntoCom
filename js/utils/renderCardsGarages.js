
const FOTO_DEFECTO = "../assets/img/chispa-mascota-3.png";
const CONTACTO_URL = new URL("../../pages/contact.html", import.meta.url).href;

// Mismo orden que Date.getDay() (0 = domingo)
const DIAS_ENUM = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];

function estaAbierto(schedules = []) {
  const ahora = new Date();
  const hoy = DIAS_ENUM[ahora.getDay()];
  const horario = schedules.find((h) => h.daysOfWeek === hoy);

  if (!horario) return false;

  // "HH:mm" con cero a la izquierda se compara bien como texto
  const horaActual = ahora.toTimeString().slice(0, 5);
  return horaActual >= horario.openAt && horaActual < horario.closesAt;
}

function escapar(texto = "") {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderizarTalleres(lista) {
  const contenedor = document.getElementById("contenedor-talleres");
  contenedor.innerHTML = "";

  lista.forEach((taller) => {
    const col = document.createElement("div");
    col.className = "col col-12 col-md-6 col-lg-4";

    const foto = escapar(taller.photoUrl || FOTO_DEFECTO);
    const serviciosActivos = (taller.services ?? []).filter((s) => s.active);
    const abierto = estaAbierto(taller.schedules);

    const badgesServicios = serviciosActivos
      .map(
        (servicio) =>
          `<span class="badge bg-light text-dark border me-1">${servicio.name}</span>`,
      )
      .join("");

    col.innerHTML = `
      <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="border-bottom" style="height: 160px; background-color: #e2e8f0">
          <img
            src="${foto}"
            alt="${escapar(taller.name)}"
            loading="lazy"
            decoding="async"
            class="w-100 h-100"
            style="object-fit: cover"
          />
        </div>

        <div class="card-body p-3">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h3 class="card-title h6 fw-bold mb-0">${escapar(taller.name)}</h3>
            <span
              class="badge text-white px-3 py-1 rounded-3 ${abierto ? "bg-primary" : "bg-secondary"}"
              style="font-size: 0.75rem"
            >
              ${abierto ? "Abierto" : "Cerrado"}
            </span>
          </div>
          <p class="small mb-2 text-secondary">${escapar(taller.address)}</p>
          <div class="d-flex flex-wrap gap-1 mb-3">
            ${badgesServicios}
          </div>
          <div class="d-flex gap-2">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm w-50 fw-semibold rounded-3 py-2"
              onclick="window.location.href='${CONTACTO_URL}'"
            >
              Cotizar
            </button>
            <button
              type="button"
              class="btn btn-tt-accent btn-sm w-50 fw-semibold rounded-3 py-2 btn-agendar"
              data-taller-id="${taller.id}"
              data-taller-nombre="${taller.name}"
            >
              Agendar
            </button>
          </div>
        </div>
      </div>
    `;

    contenedor.appendChild(col);
  });
}
