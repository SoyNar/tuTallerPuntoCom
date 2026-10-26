import { obtenerTalleres } from "../../services/talleres-service.js";

// Color de la etiqueta segun el estado ingresado
const ESTADOS = {
  activo: { texto: "Activo", clase: "bg-success text-success" },
  pendiente: { texto: "Pendiente", clase: "bg-warning text-warning-emphasis" },
  suspendido: { texto: "Suspendido", clase: "bg-danger text-danger" },
};
