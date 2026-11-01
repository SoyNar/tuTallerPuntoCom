// Solo el HTML del modal "Agendar cita".
export const plantillaAgendarCita = `
  <div id="modalCita" class="modal fade" tabindex="-1" aria-labelledby="tituloCita" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered mt-0">
      <div class="modal-content border-0 rounded-4 shadow-lg">

        <div class="modal-header border-0 align-items-start pb-0">
          <div>
            <h2 class="modal-title fs-5 fw-bold" id="tituloCita">Agendar cita</h2>
            <p class="small text-secondary mb-0">Elige servicio, vehículo, fecha y hora.</p>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>

        <div class="modal-body">
          <form id="formCita" class="vstack gap-3">

            <!-- Taller: solo el nombre -->
            <div class="rounded-4 p-3" style="background-color: var(--color-bg-soft);">
              <div class="fw-bold" id="citaTallerNombre"></div>
            </div>

            <div>
              <label for="servicio" class="form-label small fw-medium">Servicio</label>
              <select id="servicio" class="form-select">
                <option selected>Cambio de aceite</option>
                <option>Alineación y balanceo</option>
                <option>Revisión de frenos</option>
              </select>
            </div>

            <div>
              <label for="vehiculo" class="form-label small fw-medium">Vehículo</label>
              <select id="vehiculo" class="form-select">
                <option selected>Mazda 3 · ABC123</option>
              </select>
            </div>

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
                  <option value="10:30">10:30 am</option>
                  <option value="14:00">02:00 pm</option>
                  <option value="16:00">04:00 pm</option>
                </select>
              </div>
            </div>
            <div id="avisoHoras" class="small text-danger d-none">
              <i class="bi bi-exclamation-circle me-1"></i>Ya no hay horarios disponibles hoy. Elige otra fecha.
            </div>

            <div class="border rounded-4 p-3 small" style="background-color: var(--color-bg-soft);">
              <div class="d-flex justify-content-between mb-1">
                <span class="text-secondary">Fecha</span>
                <span id="resFecha" class="fw-semibold"></span>
              </div>
              <div class="d-flex justify-content-between">
                <span class="text-secondary">Hora</span>
                <span id="resHora" class="fw-semibold"></span>
              </div>
              <div class="d-flex justify-content-between align-items-center border-top border-primary-subtle pt-2 mt-2">
                <span class="fw-bold">Costo aproximado</span>
                <span id="resPrecio" class="fs-4 fw-bold text-primary">$ 90.000</span>
              </div>
            </div>

            <p class="small text-secondary mb-0">Te enviaremos la confirmación por correo electrónico.</p>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-light border fw-semibold" data-bs-dismiss="modal">Cancelar</button>
          <button type="submit" id="btnConfirmar" form="formCita" class="btn btn-tt-accent fw-semibold">Confirmar cita</button>
        </div>

      </div>
    </div>
  </div>
`;
