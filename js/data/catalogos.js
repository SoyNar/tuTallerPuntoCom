// Catálogos compartidos: valor que se guarda -> texto que se muestra.
// Los usan el wizard (resumen) y la tabla del admin.

export const TIPOS = { carros: 'Carros', motos: 'Motos', ambos: 'Carros y motos' };

export const CIUDADES = {
  medellin: 'Medellín',
  bello: 'Bello',
  envigado: 'Envigado',
  itagui: 'Itagüí',
};

export const SERVICIOS = {
  'cambio-aceite': 'Cambio de aceite',
  frenos: 'Frenos',
  alineacion: 'Alineación',
  suspension: 'Suspensión',
  electrico: 'Sistema eléctrico',
  llantas: 'Llantas',
  diagnostico: 'Diagnóstico',
};

export const DIAS = {
  lunes: 'Lun', martes: 'Mar', miercoles: 'Mié', jueves: 'Jue',
  viernes: 'Vie', sabado: 'Sáb', domingo: 'Dom',
};

export const ESTADOS = {
  activo: { texto: 'Activo', clase: 'bg-success text-success' },
  pendiente: { texto: 'Pendiente', clase: 'bg-warning text-warning-emphasis' },
  suspendido: { texto: 'Suspendido', clase: 'bg-danger text-danger' },
};
