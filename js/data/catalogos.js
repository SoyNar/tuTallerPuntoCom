// Catálogos compartidos: valor que se guarda -> texto que se muestra.
// Los usan el wizard (resumen) y la tabla del admin.
import { serviciosDisponibles } from "./garageMock.js"
export const TIPOS = { carros: 'Carros', motos: 'Motos', ambos: 'Carros y motos' };

export const CIUDADES = {
  medellin: 'Medellín',
  bello: 'Bello',
  envigado: 'Envigado',
  itagui: 'Itagüí',
};

export const serviciosCatalogo = [
    {id: 1, nombre:"Cambio de aceite", categoria: "Mecánica general", precio: 90000
    },
    {
        id:2, nombre: "Alineación",categoria: "Mecánica general", precio:100000
    },
{ id: 3, nombre: "Diagnóstico electrónico", categoria: serviciosDisponibles[0], precio: 70000 },
{ id: 4, nombre: "Instalación de sistema de audio", categoria: serviciosDisponibles[0], precio: 250000 },
{ id: 5, nombre: "Pintura de pieza", categoria: serviciosDisponibles[2], precio: 350000 },
{ id: 6, nombre: "Reparación de latonería", categoria: serviciosDisponibles[2], precio: 400000 }
]

export function obtenerServiciosTaller(taller) {
  const ids = taller?.servicios ?? [];
  return serviciosCatalogo.filter((s) => ids.includes(s.id));
}

export const DIAS = {
  lunes: 'Lun', martes: 'Mar', miercoles: 'Mié', jueves: 'Jue',
  viernes: 'Vie', sabado: 'Sáb', domingo: 'Dom',
};

export const ESTADOS = {
  activo: { texto: 'Activo', clase: 'bg-success text-success' },
  pendiente: { texto: 'Pendiente', clase: 'bg-warning text-warning-emphasis' },
  suspendido: { texto: 'Suspendido', clase: 'bg-danger text-danger' },
};
