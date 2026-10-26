import {
    talleresMock,
    talleresMap
} from "../data/garageMock.js";

// Consultar todos los talleres
export async function fetchTalleres() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...talleresMock];
}

// Buscar un taller por su id
export async function fetchTallerPorId(id) {
    return talleresMap.get(id);
}

// Filtrar los talleres por estado activo
export async function fetchTalleresActivos() {
    const talleres = await fetchTalleres();

    return talleres.filter(
        taller => taller.estado === "activo"
    );
}

// Filtrar los talleres por ciudad
export async function buscarTalleresPorCiudad(ciudad) {
    const talleres = await fetchTalleres();

    return talleres.filter(
        taller =>
            taller.ciudad.toLowerCase() ===
            ciudad.trim().toLowerCase()
    );
}

// Filtrar los talleres por servicio
export async function buscarTalleresPorServicio(servicio) {
    const talleres = await fetchTalleres();

    return talleres.filter(taller =>
        taller.servicios.some(
            item =>
                item.toLowerCase() ===
                servicio.trim().toLowerCase()
        )
    );
}
