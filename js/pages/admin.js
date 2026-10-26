import { obtenerTalleres } from "../../services/talleres-service.js";

// Color de la etiqueta segun el estado ingresado
const ESTADOS = {
  activo: { texto: "Activo", clase: "bg-success text-success" },
  pendiente: { texto: "Pendiente", clase: "bg-warning text-warning-emphasis" },
  suspendido: { texto: "Suspendido", clase: "bg-danger text-danger" },
};

// Limpia los valores de servicios ("cambio-aceite" -> "Cambio aceite)
const legible = (valor) => {
  const texto = String(valor ?? "").replace(/-/g, " ");
  return texto.charAt(0).toUpperCase() + texto.slice(1);
};
