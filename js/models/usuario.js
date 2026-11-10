export class Usuario {
    constructor(id, nombre, apellido, foto, direccion, vehiculos, contrasenia) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.foto = foto ?? "";
        this.direccion = direccion;
        this.vehiculos = vehiculos ?? [];
        this.contrasenia = Sha256.hash(contrasenia);
    }
}
