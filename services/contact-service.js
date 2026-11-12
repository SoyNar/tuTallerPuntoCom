import { showToast } from "../js/utils/toast-modal.js";
import { validateField, validarFormulario } from "../js/utils/GeneralValidatorForm.js";
import { confirmar } from "../components/js/confirm-modal.js";

const form = document.getElementById("form-contacto");
const boton = form.querySelector('button[type="submit"]');
const campos = form.querySelectorAll("input[name], select[name], textarea[name]");

    const validadores = [
  validateField("#campo-nombre", ["required", ["min", 3], ["max", 80]]),
  validateField("#campo-email", ["required", "email"]),
  validateField("#campo-asunto", ["required"]),
  validateField("#campo-telefono", ["required", "phone"]),
  validateField("#campo-mensaje", ["required", ["min", 10], ["max", 1000], "noCode"]),
];

/** Muestra el botón solo cuando todos los campos tienen contenido. */
function actualizarBoton() {
  const hayDatos = [...campos].every((c) => c.value.trim() !== "");
  boton.classList.toggle("d-none", !hayDatos);
}

form.addEventListener("input", actualizarBoton);
form.addEventListener("change", actualizarBoton);
actualizarBoton();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Pinta los errores y detiene el proceso si hay alguno
  if (!validarFormulario(validadores)) {
    form.querySelector(".border-warning")?.focus();
    return;
  }

  // Muestra el resumen y espera la decisión del usuario
  const aceptado = await confirmar({
    titulo: "Confirma tu mensaje",
    mensaje: "Revisa que los datos sean correctos antes de enviarlo.",
    detalles: [
      { etiqueta: "Nombre", valor: form.nombre.value.trim() },
      { etiqueta: "Correo", valor: form.email.value.trim() },
      { etiqueta: "Asunto", valor: form.asunto.selectedOptions[0].text },
      { etiqueta: "Teléfono", valor: form.telefono.value.trim() },
      { etiqueta: "Mensaje", valor: form.mensaje.value.trim() },
    ],
    textoAceptar: "Sí, enviar",
    textoCancelar: "Revisar",
    variante: "success",
  });

  if (!aceptado) return; // "Revisar" deja el formulario tal como está

  boton.disabled = true;
  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      showToast("¡Mensaje enviado! Te responderemos pronto.", "success");
      form.reset();
    } else {
      showToast("Hubo un problema al enviar el mensaje, intenta más tarde.", "error");
    }
  } catch {
    showToast("Error de conexión.", "error");
  } finally {
    boton.disabled = false;
    actualizarBoton();
  }
});