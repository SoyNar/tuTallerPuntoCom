class MisCitasModal extends HTMLElement {
  connectedCallback() {
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
                  <li class="nav-item"><button class="nav-link rounded-pill py-1 small" data-bs-toggle="pill" data-bs-target="#pills-pend">Pendientes</button></li>
                </ul>

                <!-- Contenedor de listados -->
                <div class="tab-content">
                  <div class="tab-pane fade show active" id="pills-todas">
                    <!-- Tarjeta Reducida Cita 1 -->
                    <div class="card border-0 rounded-3 shadow-sm p-3 mb-2 bg-white text-dark">
                      <div class="row g-0 align-items-center">
                        <div class="col-3 text-center border-end border-2 pe-2">
                          <span class="text-uppercase text-muted fw-bold d-block x-small" style="font-size: 0.75rem;">Oct</span>
                          <span class="fs-4 fw-bold text-dark d-block">10</span>
                        </div>
                        <div class="col-9 ps-3">
                          <div class="d-flex justify-content-between align-items-start mb-1">
                            <h6 class="fw-bold mb-0 text-truncate small" style="max-width: 65%;">Taller El Pistón</h6>
                            <span class="badge rounded-pill bg-success-subtle text-success x-small" style="font-size: 0.65rem;">Confirmada</span>
                          </div>
                          <p class="mb-1 text-muted x-small" style="font-size: 0.75rem;"><i class="bi bi-wrench me-1"></i> Cambio de aceite · Mazda 3</p>
                          <p class="mb-0 text-muted x-small" style="font-size: 0.75rem;"><i class="bi bi-clock me-1"></i> 10:30 am</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="tab-pane fade" id="pills-conf">
                    <p class="text-muted small text-center my-4">Sin citas confirmadas.</p>
                  </div>
                  <div class="tab-pane fade" id="pills-pend">
                    <p class="text-muted small text-center my-4">Sin citas pendientes.</p>
                  </div>
                </div>
              </div>

              <!-- Pie fijo inferior para acciones -->
              <div class="text-center mt-3 pt-2 border-top">
                <p class="text-muted x-small mb-2" style="font-size: 0.75rem;"><i class="bi bi-bell-fill text-warning me-1"></i> Próxima cita: 10 oct - 10:30 am</p>
                <button class="btn btn-tt-accent w-100 rounded-pill py-2 fw-semibold text-white small" style="background-color: #fd7e14; font-size: 0.875rem;">
                  Agendar nueva cita
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    `;

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
  }
}

customElements.define('mis-citas-modal', MisCitasModal);