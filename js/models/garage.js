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
        tipoVehiculos,
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
        this.tipoVehiculos = tipoVehiculos ?? [];
        this.foto = foto;
        this.estado = estado;
    }
}