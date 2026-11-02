// Panel azul de marca compartido por login y registro.
const MASCOTA = new URL("../../assets/img/chispa-mascota-3.png", import.meta.url).href;

class AuthMarca extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="position-relative w-100 auth-ancho">
        <img src="${MASCOTA}" alt="Chispa, la mascota de TuTaller"
             width="152" class="img-fluid d-block mb-5">

        <h2 class="display-6 fw-bold text-white mb-3">
          Tu vehículo,<br>en buenas manos.
        </h2>
        <p class="text-white-50 mb-4">
          Agenda tu cita y haz seguimiento a tus servicios sin llamar al taller.
        </p>

        <ul class="list-unstyled small fw-semibold mb-0">
          <li class="d-flex align-items-center gap-3 mb-3">
            <span class="auth-punto rounded-circle flex-shrink-0"></span>Citas en talleres asociados
          </li>
          <li class="d-flex align-items-center gap-3 mb-3">
            <span class="auth-punto rounded-circle flex-shrink-0"></span>Cotiza antes de ir
          </li>
          <li class="d-flex align-items-center gap-3">
            <span class="auth-punto rounded-circle flex-shrink-0"></span>Historial de todos tus servicios
          </li>
        </ul>
      </div>`;
  }
}

customElements.define("auth-marca", AuthMarca);