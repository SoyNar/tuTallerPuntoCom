export class Taller {
    constructor({
        id,
        nombre,
        nit,
        telefono,
        correo,
        direccion,
        ciudad,
        coordenadas,
        horarios,
        servicios,
        foto,
        estado
    }) {
        this.id = id;
        this.nombre = nombre;
        this.nit = nit;
        this.telefono = telefono;
        this.correo = correo;
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.coordenadas = coordenadas;
        this.horarios = horarios;
        this.servicios = servicios;
        this.foto = foto;
        this.estado = estado;
    }
}