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

export const avisarCitaCancelada = () =>
  showToast(
    "Tu cita ha sido cancelada.",
    "success",
    "Cita cancelada",
  );

export const avisarCitaReprogramada = () =>
  showToast(
    "Actualizamos la fecha y hora de tu cita.",
    "success",
    "Cita reprogramada",
  );

export const avisarErrorReprogramarCita = () =>
  showToast(
    "Inténtalo de nuevo en unos minutos.",
    "error",
    "No pudimos reprogramar la cita",
  );

export const avisarErrorCancelarCita = () =>
  showToast(
    "Inténtalo de nuevo en unos minutos.",
    "error",
    "No pudimos agendar la cita",
  );
