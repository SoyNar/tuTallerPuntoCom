import { showToast } from "./toast-modal.js";

export const avisarCitaAgendada = () =>
  showToast(
    "Te enviamos la confirmación a tu correo.",
    "success",
    "Cita agendada",
  );

export const avisarErrorCita = () =>
  showToast(
    "Inténtalo de nuevo en unos minutos.",
    "error",
    "No pudimos agendar la cita",
  );
