import { renderizarCitas } from '../../js/utils/renderCitas.js';
import { citasOrdenadas, cancelarCita } from '../../services/citas-service.js';
import { avisarCitaCancelada, avisarErrorCancelarCita } from '../../js/utils/avisos-cita.js';
import { confirmarEliminar } from './confirm-modal.js';

class MisCitasModal extends HTMLElement {
  async connectedCallback() {
    this.innerHTML = `
      <!-- ============ INTERFAZ FLOTANTE LATERAL MIS CITAS ============ -->
      <div class="modal fade" id="modalAgendas" tabindex="-1" aria-hidden="true">
        <!-- Posicionamiento forzado a la derecha, alto completo y margen lateral -->
        <div class="modal-dialog m-0 ms-auto me-md-4 my-md-4" style="max-width: 400px; width: 100%;">
          <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden border" style="height: calc(100vh - 3rem); min-height: 500px;">
            
            <!-- Encabezado compacto institucional -->
            <div class="modal-header border-0 d-flex flex-column align-items-center text-white py-3 position-relative" style="background-color: #0d6efd;">
              <button type="button" class="btn-close btn-close-white position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Close"></button>
              
              <div class="bg-white rounded-circle d-flex align-items-center justify-content-center mb-1 shadow-sm" style="width: 45px; height: 40px;">
                <i class="bi bi-calendar-check text-primary fs-5"></i>
              </div>
              <h6 class="modal-title fw-bold">Mi Agenda</h6>
            </div>

            <!-- Cuerpo del panel lateral ajustable -->
            <div class="modal-body p-3 bg-light text-start d-flex flex-column justify-content-between">
              
              <div>
                <!-- Selector de Pestañas ultra compacto -->
                <ul class="nav nav-pills nav-fill bg-white p-1 rounded-pill mb-3 shadow-sm small fw-semibold" role="tablist">
                  <li class="nav-item"><button class="nav-link active rounded-pill py-1 small" data-bs-toggle="pill" data-bs-target="#pills-todas">Todas</button></li>
                  <li class="nav-item"><button class="nav-link rounded-pill py-1 small" data-bs-toggle="pill" data-bs-target="#pills-conf">Confirmadas</button></li>
                  <li class="nav-item"><button class="nav-link rounded-pill py-1 small" data-bs-toggle="pill" data-bs-target="#pills-cancel">Canceladas</button></li>
                </ul>

                <!-- Contenedor de listados -->
                <div class="tab-content">
                  <div class="tab-pane fade show active" id="pills-todas">
                  </div>
                  <div class="tab-pane fade" id="pills-conf">
                  </div>
                  <div class="tab-pane fade" id="pills-cancel">
                  </div>
                </div>
              </div>

              <!-- Pie fijo inferior para acciones -->
              <div class="text-center mt-3 pt-2 border-top">
                <p class="text-muted x-small mb-2" style="font-size: 0.75rem;"><i class="bi bi-bell-fill text-warning me-1"></i> <span id="proximaCita"></span></p>
                <button id="btnAgendarCita" class="btn btn-tt-accent w-100 rounded-pill py-2 fw-semibold text-white small" style="background-color: #fd7e14; font-size: 0.875rem;">
                  Agendar nueva cita
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    `;

    this.addEventListener('click', async (e) => {
      const enlace = e.target.closest('[data-accion="cancelar"]');
      if (!enlace) return;

      e.preventDefault(); // evita que el href="#" mueva la página

      if (! await confirmarEliminar('esta cita')) return;

      const cita = await cancelarCita(enlace.dataset.id);
      if (!cita) {
        avisarErrorCancelarCita();
        return;
      }
      avisarCitaCancelada();
    });


    await this.actualizarCitas();

    // volver a renderizar cada vez que se crea o cancela una cita
    this.alCambiarCitas = () => this.actualizarCitas();
    window.addEventListener('citas:modificadas', this.alCambiarCitas);

    // escuchar click global para abrir modal
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('#btnAbrirAgenda');
      if(btn){
        e.preventDefault();
        e.stopPropagation();

        const modalEl = document.querySelector('#modalAgendas');
        if(modalEl){
          const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl,{});
          modalInstance.show()
        }
      }
    })

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('#btnAgendarCita');
      if(btn){
        e.preventDefault();
        e.stopPropagation();
        // ir a catalogo de talleres para agendar cita
        window.location.href = '/pages/catalog.html';
      }
    })
  }

  disconnectedCallback() {
    window.removeEventListener('citas:modificadas', this.alCambiarCitas);
  }

  async actualizarCitas() {
    const citas = await citasOrdenadas();
    const citasConfirmadas = citas.filter(cita => cita.estado === 'confirmada');
    const citasCanceladas = citas.filter(cita => cita.estado === 'cancelada');

    renderizarCitas(citas, "pills-todas");
    renderizarCitas(citasConfirmadas, "pills-conf");
    renderizarCitas(citasCanceladas, "pills-cancel");

    await this.actualizarProximaCita();
  }

  async actualizarProximaCita() {
    const ahora = new Date();
    const proxima = (await citasOrdenadas())
      .filter(cita => cita.estado === 'confirmada')
      .map(cita => ({ ...cita, inicio: new Date(`${cita.fecha}T${cita.hora}`) }))
      .find(cita => cita.inicio >= ahora);

    const span = this.querySelector('#proximaCita');
    if (!proxima) {
      span.textContent = 'No tienes citas próximas';
      return;
    }

    const dia = proxima.inicio.getDate();
    const mes = proxima.inicio.toLocaleString('es-ES', { month: 'short' }).replace('.', '');
    const hora = proxima.inicio.toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true });
    span.textContent = `Próxima cita: ${dia} ${mes} - ${hora}`;
  }
}

customElements.define('mis-citas-modal', MisCitasModal);