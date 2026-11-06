import { renderizarCitas } from '../../js/utils/renderCitas.js';
import { citasOrdenadas, cancelarCita, reprogramarCita } from '../../services/citas-service.js';
import { avisarCitaCancelada, avisarErrorCancelarCita, avisarCitaReprogramada, avisarErrorReprogramarCita } from '../../js/utils/avisos-cita.js';
import { confirmar } from './confirm-modal.js';
import { fechaLocal, bloquearHorasPasadas } from '../../js/utils/horarios-cita.js';
import { plantillaAgendarCita } from './agendarCitaTemplate.js';

// Toma las <option> del select #hora del modal "Agendar cita",
// así reprogramar ofrece exactamente los mismos horarios que agendar.
function opcionesHoraAgendar() {
  const tpl = document.createElement('template');
  tpl.innerHTML = plantillaAgendarCita;
  return tpl.content.querySelector('#hora')?.innerHTML ?? '';
}

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
            <div class="modal-body p-3 bg-light text-start d-flex flex-column" style="height: calc(100% - 75px); overflow: hidden;">
            <!-- Contenedor superior independiente (Ocupa el espacio disponible y tiene scroll propio) -->
            <div class="d-flex flex-column flex-grow-1 overflow-hidden mb-2">
            
            <!-- Selector de Pestañas ultra compacto -->
            <ul class="nav nav-pills nav-fill bg-white p-1 rounded-pill mb-3 shadow-sm small fw-semibold" role="tablist">
            <li class="nav-item"><button class="nav-link active rounded-pill py-1 small" data-bs-toggle="pill" data-bs-target="#pills-todas">Todas</button></li>
            <li class="nav-item"><button class="nav-link rounded-pill py-1 small" data-bs-toggle="pill" data-bs-target="#pills-conf">Confirmadas</button></li>
            <li class="nav-item"><button class="nav-link rounded-pill py-1 small" data-bs-toggle="pill" data-bs-target="#pills-cancel">Canceladas</button></li>
            </ul>
            
            <!-- Contenedor de listados con Scroll integrado -->
            <div class="tab-content flex-grow-1 overflow-y-auto px-1" style="max-height: 100%;">
            <div class="tab-pane fade show active" id="pills-todas">
            </div>
            <div class="tab-pane fade" id="pills-conf">
            </div>
            <div class="tab-pane fade" id="pills-cancel">
            </div>
            </div>
            </div>
            
            <!-- Pie fijo inferior para acciones (Nunca se mueve ni se oculta) -->
            <div class="text-center mt-auto pt-2 border-top bg-light position-sticky bottom-0">
            <p class="text-muted x-small mb-2" style="font-size: 0.75rem;"><i class="bi bi-bell-fill text-warning me-1"></i> <span id="proximaCita"></span></p>
            <button id="btnAgendarCita" class="btn btn-tt-accent w-100 rounded-pill py-2 fw-semibold text-white small" style="background-color: #fd7e14; font-size: 0.875rem;">
            Agendar nueva cita
            </button>
            </div>
            </div>
    `;

    this.addEventListener('click', async (e) => {
      const enlace = e.target.closest('[data-accion="cancelar"]');
      if (!enlace) return;

      e.preventDefault(); // evita que el href="#" mueva la página

      const confirmado = await confirmar({
          titulo: "Cancelar",
          mensaje: `¿Cancelar esta cita? Esta acción no se puede deshacer.`,
          textoAceptar: "Cancelar cita",
          textoCancelar: "Mantener cita",
          variante: "danger",
        })

      if (! confirmado ) return;

      const cita = await cancelarCita(enlace.dataset.id);
      if (!cita) {
        avisarErrorCancelarCita();
        return;
      }
      avisarCitaCancelada();
    });

    this.addEventListener('click', async (e) => {
      const enlace = e.target.closest('[data-accion="reprogramar"]');
      if (!enlace) return;

      e.preventDefault(); // evita que el href="#" mueva la página

      const nuevo = await this.reprogramarFechayHora(enlace);
      if (!nuevo) return; // el usuario no eligió fecha/hora

      const confirmado = await confirmar({
        titulo: "Reprogramar",
        mensaje: `¿Reprogramar esta cita? Esta acción no se puede deshacer.`,
        textoAceptar: "Reprogramar",
        variante: "success",
      })

      if (! confirmado ) return;

      const cita = await reprogramarCita(enlace.dataset.id, nuevo);
      if (!cita) {
        avisarErrorReprogramarCita();
        return;
      }
      avisarCitaReprogramada();
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

   async reprogramarFechayHora(enlace) {
    const id = Number(enlace.dataset.id);
    const cita = (await citasOrdenadas()).find(c => c.id === id);
    if (!cita) return null;

    const pie = enlace.parentElement; // contenedor de los enlaces Reprogramar / Cancelar

    const form = document.createElement('form');
    form.className = 'border-top mt-2 pt-2 vstack gap-2';
    form.innerHTML = `
      <div class="row g-2">
        <div class="col-6">
          <input type="date" name="fecha" class="form-control form-control-sm" aria-label="Nueva fecha" required>
        </div>
        <div class="col-6">
          <select name="hora" class="form-select form-select-sm" aria-label="Nueva hora">
            ${opcionesHoraAgendar()}
          </select>
        </div>
      </div>
      <div class="small text-danger d-none" data-aviso>
        <i class="bi bi-exclamation-circle me-1"></i>No hay horarios disponibles ese día.
      </div>
      <div class="d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-sm btn-outline-secondary" data-volver>Volver</button>
        <button type="submit" class="btn btn-sm btn-primary">Guardar</button>
      </div>
    `;

    const fecha = form.elements.fecha;
    const hora = form.elements.hora;
    const aviso = form.querySelector('[data-aviso]');
    const btnGuardar = form.querySelector('[type="submit"]');

    // valores iniciales: la fecha/hora actual de la cita (sin permitir días pasados)
    fecha.min = fechaLocal();
    fecha.value = cita.fecha < fechaLocal() ? fechaLocal() : cita.fecha;
    if ([...hora.options].some(op => op.value === cita.hora)) hora.value = cita.hora;

    // bloquea horas pasadas si la fecha es hoy
    const refrescar = () => {
      const hayHoras = bloquearHorasPasadas(hora, fecha.value);
      aviso.classList.toggle('d-none', hayHoras);
      btnGuardar.disabled = !hayHoras;
    };
    fecha.addEventListener('change', refrescar);
    refrescar();

    pie.classList.add('d-none');
    pie.after(form);
    fecha.focus();

    return new Promise((resolve) => {
      const cerrar = (resultado) => {
        form.remove();
        pie.classList.remove('d-none');
        resolve(resultado);
      };

      form.querySelector('[data-volver]').addEventListener('click', () => cerrar(null));

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!fecha.value || fecha.value < fechaLocal()) return;
        refrescar();
        if (btnGuardar.disabled) return;

        // si no cambió nada, no hay nada que reprogramar
        if (fecha.value === cita.fecha && hora.value === cita.hora) return cerrar(null);

        cerrar({ fecha: fecha.value, hora: hora.value });
      });
    });
  }
}

customElements.define('mis-citas-modal', MisCitasModal);