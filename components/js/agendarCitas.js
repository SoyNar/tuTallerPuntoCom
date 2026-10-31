import { plantillaAgendarCita } from "./agendarCitaTemplate.js";

// Componente html para el formulario de agendar
class AgendarCitaModal extends HTMLElement {
  // Componente propio de js para insertar la plantillaAgendarCita
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
}
