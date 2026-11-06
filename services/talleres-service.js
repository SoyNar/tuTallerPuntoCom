import { talleresMock } from "../js/data/garageMock.js";
import { Taller } from "../js/models/garage.js";

const KEY = 'talleres';


/***
 * LEctura cruda de localStorage, sin normalizar ni instanciar Taller
 */
export function leerLocalStorage(){
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch (e) {
    console.error("No se pudo leer localStorage", e);
    return [];
  }

}

export function obtenerTalleres(){
    return leerLocalStorage().map(t => new Taller(t));
}

// funcion para guardar taller en el localstorage
// puede mutar luego para usar la api real de springboot

export function guardarTaller(taller)
{
    const talleres = leerLocalStorage();
    const nuevo = normalizarTaller(taller);
    talleres.push(nuevo);
    try{
    localStorage.setItem(KEY,JSON.stringify(talleres));
    return nuevo;
    }catch(e){
        console.error("No se pudo guardar en el localstrage",e);
        return null;
    }
    

}

export function mergeTalleres(){
    return [
    ...talleresMock.map(t => ({ ...t, esBase: true })),
    ...obtenerTalleres(),
  ];
}

function normalizarTaller(f) {
  return {
    id: Date.now(),
    estado: 'pendiente',
    nombre: f.nombre.trim(),
    nit: f.nit,
    telefono: f.telefono,
    correo: f.correo,
    tipoVehiculos: f.tipoVehiculos,
    direccion: f.direccion,
    ciudad: f.ciudad.trim(),
    coordenadas: { lat: Number(f.latitud), lng: Number(f.longitud) },
    horarios: { dias: f.dias, apertura: f.apertura, cierre: f.cierre },
    servicios: f.servicios,
    foto: f.foto,
  };
}

export function eliminarTaller(id) {
  const restantes = leerLocalStorage().filter(t => String(t.id) !== String(id));
  localStorage.setItem(KEY, JSON.stringify(restantes));
}



export function mergeHistorial() {
  const talleres = mergeTalleres();

  return [...historialMock, ...obtenerHistorialGuardado()]
    .map(a => ({
      ...a,
      tallerNombre: talleres.find(t => t.id === a.tallerId)?.nombre ?? "Taller desconocido",
    }))
    .sort((a, b) => b.fecha.localeCompare(a.fecha)); 
}