import { guardarCita } from "../../services/citas-service.js";
import {
  fechaLocal,
  fechaManana,
  fechaLegible,
  bloquearHorasPasadas,
} from "../../js/utils/horarios-cita.js";
import {
  avisarCitaAgendada,
  avisarErrorCita,
} from "../../js/utils/avisos-cita.js";
import { plantillaAgendarCita } from "./agendarCitaTemplate.js";

class AgendarCitaModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = plantillaAgendarCita;
    this.modalEl = this.querySelector("#modalCita");
    this.fecha = this.querySelector("#fecha");
    this.hora = this.querySelector("#hora");
    this.btnConfirmar = this.querySelector("#btnConfirmar");
    this.guardando = false; // evita registrar la cita dos veces

    this.fecha.addEventListener("change", () => this.refrescar());
    this.hora.addEventListener("change", () => this.actualizarResumen());
    this.querySelector("#formCita").addEventListener("submit", (e) =>
      this.confirmar(e),
    );
    this.modalEl.addEventListener("hidden.bs.modal", () => this.alCerrar());

    this.reiniciar();
  }

  abrir({ id, nombre }) {
    this.modalEl.dataset.tallerId = id;
    this.querySelector("#citaTallerNombre").textContent = nombre;
    this.reiniciar();

    window.bootstrap.Modal.getOrCreateInstance(this.modalEl).show();
  }

  reiniciar() {
    this.fecha.min = fechaLocal();
    this.fecha.value = fechaLocal();
    this.refrescar();
    if (!this.hayHoras) {
      this.fecha.value = fechaManana();
      this.refrescar();
    }
  }

  refrescar() {
    if (this.fecha.value && this.fecha.value < fechaLocal())
      this.fecha.value = fechaLocal();
    this.hayHoras = bloquearHorasPasadas(this.hora, this.fecha.value);
    this.querySelector("#avisoHoras").classList.toggle("d-none", this.hayHoras);
    this.btnConfirmar.disabled = !this.hayHoras || this.guardando;
    this.actualizarResumen();
  }

  actualizarResumen() {
    if (this.fecha.value)
      this.querySelector("#resFecha").textContent = fechaLegible(
        this.fecha.value,
      );
    const op = this.hora.selectedOptions[0];
    this.querySelector("#resHora").textContent = op.disabled ? "—" : op.text;
  }

  async confirmar(e) {
    e.preventDefault();
    if (this.guardando) return;

    const horaElegida = this.hora.value;
    this.refrescar();
    if (!this.hayHoras || this.hora.value !== horaElegida) return;

    this.guardando = true;
    this.btnConfirmar.disabled = true;
    const op = this.hora.selectedOptions[0];

    try {
      await guardarCita({
        tallerId: Number(this.modalEl.dataset.tallerId),
        tallerNombre: this.querySelector("#citaTallerNombre").textContent,
        servicio: this.querySelector("#servicio").value,
        vehiculo: this.querySelector("#vehiculo").value,
        fecha: this.fecha.value,
        hora: op.value,
        horaTexto: op.text,
      });
    } catch (err) {
      console.error("Error al guardar la cita:", err);
      this.guardando = false;
      this.refrescar();
      avisarErrorCita();
      return;
    }

    avisarCitaAgendada();
    window.bootstrap.Modal.getInstance(this.modalEl)?.hide();
  }

  alCerrar() {
    this.guardando = false;
    this.refrescar();
  }
}

customElements.define("agendar-cita-modal", AgendarCitaModal);
