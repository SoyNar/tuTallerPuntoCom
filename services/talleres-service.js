
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