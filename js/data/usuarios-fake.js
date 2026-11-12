import { Usuario } from "../models/usuario.js";

const CONTRASENIA_FAKE = "123456equipo7";

// datos fake de los usuarios
// new Usuario(id, nombre, apellido, foto, direccion, vehiculos, contrasenia)
export const usuariosFake = [
  new Usuario(1, "Admin", "TuTaller", "", "Medellín, Antioquia", [], CONTRASENIA_FAKE, "admin"),
    new Usuario(12, "Johana Bedoya", "Gómez Hernandez", "", "Calle 12 # 43E-49, Medellín", [7, 8], CONTRASENIA_FAKE),
    new Usuario(13, "Carlos Andrés", "Restrepo Muñoz", "", "Carrera 70 # 44-21, Medellín", [9, 26], CONTRASENIA_FAKE),
    new Usuario(14, "Valentina", "Ospina Arango", "", "Calle 37 Sur # 27-15, Envigado", [10, 11], CONTRASENIA_FAKE),
    new Usuario(15, "Santiago", "Zapata Londoño", "", "Carrera 50 # 52-30, Bello", [12, 22], CONTRASENIA_FAKE),
    new Usuario(16, "Laura Marcela", "Cardona Ríos", "", "Calle 51 # 48-09, Itagüí", [13, 23], CONTRASENIA_FAKE),
    new Usuario(17, "Juan Felipe", "Vélez Castaño", "", "Carrera 43A # 1-50, Medellín", [14, 15], CONTRASENIA_FAKE),
    new Usuario(18, "Daniela", "Henao Correa", "", "Calle 10 # 32-115, Medellín", [16, 24], CONTRASENIA_FAKE),
    new Usuario(19, "Andrés Mauricio", "Giraldo Patiño", "", "Carrera 43 # 38 Sur-35, Envigado", [17, 25], CONTRASENIA_FAKE),
    new Usuario(20, "Paula Andrea", "Montoya Salazar", "", "Diagonal 55 # 34-67, Bello", [18, 19], CONTRASENIA_FAKE),
    new Usuario(21, "Sebastián", "Arias Quintero", "", "Carrera 52 # 74-20, Itagüí", [20, 21], CONTRASENIA_FAKE),
];

export const correosFake = [
  'admin@demo.com',
  'johana@demo.com',
  'carlos@demo.com',
  'valentina@demo.com',
  'santiago@demo.com',
  'laura@demo.com',
  'juan@demo.com',
  'daniela@demo.com',
  'andres@demo.com',
  'paula@demo.com',
  'sebastian@demo.com',
];
