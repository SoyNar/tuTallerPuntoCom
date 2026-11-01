import { guardarCita } from "../../services/citas-service.js";
import {obtenerMisVehiculos} from "../../js/data/usuario-fake.js";
import {obtenerServiciosTaller} from "../../js/data/catalogos.js";
import {tallerAtiende} from "../../js/data/catalogos.js"; 
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
     this.servicios = [];
    this.cortos = 0;
    this.querySelector("#servicio").addEventListener("change", () => this.actualizarPrecio());
    this.fecha.addEventListener("change", () => this.refrescar());
    this.hora.addEventListener("change", () => this.actualizarResumen());
    this.querySelector("#formCita").addEventListener("submit", (e) =>
      this.confirmar(e),
    );
    this.modalEl.addEventListener("hidden.bs.modal", () => this.alCerrar());

    this.reiniciar();
  }

   async abrir(taller) {
    this.taller = taller
    this.modalEl.dataset.tallerId = taller.id;
    this.querySelector("#citaTallerNombre").textContent = taller.nombre;
    this.servicios = obtenerServiciosTaller(taller);
    console.log("taller:", taller);
console.log("servicios:", this.servicios);
    this.llenarSelect(this.querySelector("#servicio"), this.servicios);
    this.actualizarPrecio();

    const vehiculos = (await obtenerMisVehiculos()).filter((v) => tallerAtiende(taller,v));
    const todos = await obtenerMisVehiculos();
console.log("sesion:", JSON.parse(localStorage.getItem("sesion")));
console.log("mis vehiculos:", todos);
console.log("tipoVehiculos del taller:", taller.tipoVehiculos);
// const vehiculos = todos.filter(atiende);
console.log("compatibles:", vehiculos);
    this.llenarSelect(this.querySelector("#vehiculo"), vehiculos, (v) => `${v.marca} ${v.modelo} (${v.placa})`);
    this.reiniciar();

    window.bootstrap.Modal.getOrCreateInstance(this.modalEl).show();
  }
   llenarSelect(select, items, texto = (i) => i.nombre) {
    select.replaceChildren(...items.map((i) => new Option(texto(i), i.id)));
  }
  actualizarPrecio() {
    const serv = this.servicios.find((s) => s.id === Number(this.querySelector("#servicio").value));
    this.costo = serv?.precio ?? 0;
    this.querySelector("#resPrecio").textContent = `$ ${this.costo.toLocaleString("es-CO")}`;

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

    
     const resp = await guardarCita({
        taller_id: Number(this.modalEl.dataset.tallerId),
        // tallerNombre: this.querySelector("#citaTallerNombre").textContent,
        servicio_id: this.querySelector("#servicio").value,
        vehiculo_id :this.querySelector("#vehiculo").value,
        fecha: this.fecha.value,
        hora: op.value,
        costo_aproximado: this.costo,
        // horaTexto: op.text,
     });
      
        if(!resp){
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
