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
    const talleres = obtenerTalleres();
    const nuevo = {id: Date.now(), estado: 'pendiente',...taller};
    talleres.push(nuevo);
    localStorage.setItem(KEY,JSON.stringify(talleres));
    return nuevo;

}

export function mergeTalleres(){
    return[... talleresMock, ...obtenerTalleres().map(t => new Taller(t))];
}

// export function mergeHistorial(){
//     const talleres = this.mergeTalleres();

//     return [...historialMock, ...obtenerTalleres()].map(a => ({
//         ...a,
//         tallernombre: talleres.find(t => t.id === a.tallerId)?.nombre ? "Taller desconocido"
//     }))
// }