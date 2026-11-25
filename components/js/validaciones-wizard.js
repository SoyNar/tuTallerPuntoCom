import { validateField, validateGroup } from "../../js/utils/GeneralValidatorForm.js";

export function activarValidaciones() {
  return {
    0: [
      validateField("#tallerNombre", ["required", ["min", 3], ["max", 20], "noCode"]),
      validateField("#tallerNit", ["required", ["digits", [9, 15]]]),
      validateField("#tallerTelefono", ["required", "phone"]),
      validateField("#tallerCorreo", ["required", "email"]),
    ].filter(Boolean),

    1: [
      validateField("#taller-direccion", ["required", ["min", 5], ["max", 100], "noCode"]),
      validateField("#taller-ciudad", ["required", ["min", 4], ["max", 100], "noCode"]),
    ].filter(Boolean),

    2: [
      validateGroup("#diasAtencion", "dias", 1, "Selecciona al menos un día."),
      validateField('[name="cierre"]', [["later", '[name="apertura"]']], {
        later: "La hora de cierre debe ser posterior a la de apertura.",
      }),
      validateGroup("#serviciosTaller", "servicios", 1, "Elige al menos un servicio."),
    ].filter(Boolean),

    3: [
      validateGroup("#estadoTaller", "estado", 1, "Elige un estado."),
    ].filter(Boolean),
  };
}

export function limpiarValidaciones() {
  document.querySelectorAll("#wizardBody .alerta-validacion").forEach((a) => a.remove());
  document
    .querySelectorAll("#wizardBody .border-warning, #wizardBody .border-success")
    .forEach((el) => el.classList.remove("border", "border-warning", "border-success"));
}