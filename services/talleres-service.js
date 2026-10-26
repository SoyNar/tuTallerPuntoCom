import { talleresMock } from "../js/data/garageMock.js";
import { Taller } from "../js/models/garage.js";

const KEY = 'talleres';

export function obtenerTalleres(){
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
}

// funcion para guardar taller en el localstorage
// puede mutar luego para usar la api real de springboot

export function guardarTaller(taller)
{
    const talleres = obtenerTalleres(datosForm);
    const nuevo = normalizarTaller(datosForm);
    talleres.push(nuevo);
    try{
    localStorage.setItem(KEY,JSON.stringify(talleres));
    return taller;
    }catch(e){
        console.error("No se pudo guardar en el localstrage",e);
        return null;
    }
    

}

export function mergeTalleres(){
    return[... talleresMock, ...obtenerTalleres().map(t => new Taller(t))];
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



export function mergeHistorial() {
  const talleres = mergeTalleres();

  return [...historialMock, ...obtenerHistorialGuardado()]
    .map(a => ({
      ...a,
      tallerNombre: talleres.find(t => t.id === a.tallerId)?.nombre ?? "Taller desconocido",
    }))
    .sort((a, b) => b.fecha.localeCompare(a.fecha)); 
}