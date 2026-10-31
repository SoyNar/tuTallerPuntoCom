import { guardarCita } from "../../services/citas-service.js";

class AgendarCitaModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="modalCita" class="modal fade" tabindex="-1" aria-labelledby="tituloCita" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered mt-0">
          <div class="modal-content border-0 rounded-4 shadow-lg">

            <!-- Encabezado -->
            <div class="modal-header border-0 align-items-start pb-0">
              <div>
                <h2 class="modal-title fs-5 fw-bold" id="tituloCita">Agendar cita</h2>
                <p class="small text-secondary mb-0">Elige servicio, vehículo, fecha y hora.</p>
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>

            <!-- Cuerpo -->
            <div class="modal-body">
              <form id="formCita" class="vstack gap-3">

                <!-- Taller -->
                <div class="d-flex align-items-center gap-3   rounded-4 p-3" style="background-color: var(--color-bg-soft);">
                  <div class="d-flex align-items-center justify-content-center flex-shrink-0 bg-white border rounded-3 text-secondary small" style="width:44px;height:44px">Foto</div>
                  <div class="flex-grow-1">
                    <div class="fw-bold" id="citaTallerNombre">Taller</div>
                    <div class="small text-secondary" id="citaTallerInfo"></div>
                  </div>
                </div>

                <!-- Servicio -->
                <div>
                  <label for="servicio" class="form-label small fw-medium">Servicio</label>
                  <select id="servicio" class="form-select">
                    <option selected>Cambio de aceite</option>
                    <option>Alineación y balanceo</option>
                    <option>Revisión de frenos</option>
                  </select>
                </div>

                <!-- Vehículo -->
                <div>
                  <label for="vehiculo" class="form-label small fw-medium">Vehículo</label>
                  <select id="vehiculo" class="form-select">
                    <option selected>Mazda 3 · ABC123</option>
                  </select>
                </div>

                <!-- Fecha y hora -->
                <div class="row g-3">
                  <div class="col-12 col-sm-6">
                    <label for="fecha" class="form-label small fw-medium">Fecha</label>
                    <input type="date" id="fecha" class="form-control" required>
                  </div>
                  <div class="col-12 col-sm-6">
                    <label for="hora" class="form-label small fw-medium">Hora</label>
                    <select id="hora" class="form-select">
                      <option value="08:00">08:00 am</option>
                      <option value="09:00">09:00 am</option>
                      <option value="10:30" selected>10:30 am</option>
                      <option value="14:00">02:00 pm</option>
                      <option value="16:00">04:00 pm</option>
                    </select>
                  </div>
                </div>

                <!-- Resumen -->
                <div class=" border rounded-4 p-3 small"style="background-color: var(--color-bg-soft);" >
                  <div class="d-flex justify-content-between mb-1">
                    <span class="text-secondary">Fecha</span>
                    <span id="resFecha" class="fw-semibold">Sábado 10 de octubre</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span class="text-secondary">Hora</span>
                    <span id="resHora" class="fw-semibold">10:30 am</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center border-top border-primary-subtle pt-2 mt-2">
                    <span class="fw-bold">Costo aproximado</span>
                    <span id="resPrecio" class="fs-4 fw-bold text-primary">$ 90.000</span>
                  </div>
                </div>

                <p class="small text-secondary mb-0">Te enviaremos la confirmación por correo electrónico.</p>
              </form>
            </div>

            <!-- Pie -->
            <div class="modal-footer">
              <button type="button" id="btnCancelar" class="btn btn-light border fw-semibold" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" id="btnConfirmar" form="formCita" class="btn btn-tt-accent fw-semibold">Confirmar cita</button>
            </div>

          </div>
        </div>
      </div>
    `;

    const form = this.querySelector("#formCita");
    const fecha = this.querySelector("#fecha");
    const hora = this.querySelector("#hora");

    // fecha de hoy en hora local: no permite agendar en el pasado
    const hoy = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    fecha.min = hoy;
    fecha.value = hoy;

    // Mostrar la fecha agradabe para el usuario
    const actualizarResumen = () => {
      if (!fecha.value) return;
      const [y, m, d] = fecha.value.split("-").map(Number);
      this.querySelector("#resFecha").textContent = new Date(
        y,
        m - 1,
        d,
      ).toLocaleDateString("es-CO", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
      this.querySelector("#resHora").textContent = hora.selectedOptions[0].text;
    };

    fecha.addEventListener("change", actualizarResumen);
    hora.addEventListener("change", actualizarResumen);
    actualizarResumen();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!fecha.value) return;

      const modalEl = this.querySelector("#modalCita");
      guardarCita({
        tallerId: Number(modalEl.dataset.tallerId),
        tallerNombre: this.querySelector("#citaTallerNombre").textContent,
        servicio: this.querySelector("#servicio").value,
        vehiculo: this.querySelector("#vehiculo").value,
        fecha: fecha.value,
        hora: hora.value,
        horaTexto: hora.selectedOptions[0].text,
      });

      bootstrap.Modal.getInstance(modalEl)?.hide();
    });
  }
}

customElements.define("agendar-cita-modal", AgendarCitaModal);
