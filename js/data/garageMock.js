import { Taller } from "../models/garage.js";

//servicios que vamos a manejar
export const serviciosDisponibles = [
    "Electrónica y equipamiento del vehículo",
    "Mecánica general",
    "Latonería y pintura"
];

// datos fake de los talleres - 3Electrónica y equipamiento del vehículo - 4 mecanica general y 3 latoneria y pintura
export const talleresMock = [
    new Taller({
        id: 1,
        nombre: "Volt & Audio Garage",
        nit: "900123456-1",
        telefono: "3001234567",
        correo: "voltaudiogarage@gmail.com",
        direccion: "Carrera 20 #80-68",
        ciudad: "Bogotá",
        coordenadas: { lat: 4.668502, lng: -74.060751 },
        horarios: {
            dias:  ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            apertura: "08:00",
            cierre: "20:00"
        },
        servicios: ["Electrónica", "Equipamiento"],
        tipoVehiculos: ["Automóvil", "Moto"],
        foto: "https://images.pexels.com/photos/4116231/pexels-photo-4116231.jpeg",
        estado: "activo"
    }),

    new Taller({
        id: 2,
        nombre: "TecnoSmart Auto",
        nit: "901234567-2",
        telefono: "3001234568",
        correo: "tecnosmartauto@gmail.com",
        direccion: "Calle 12 # 43E-49",
        ciudad: "Medellín",
        coordenadas: { lat: 6.214070, lng: -75.573234 },
        horarios: {
            dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            apertura: "07:30",
            cierre: "17:30"
        },
        servicios: ["Electrónica", "Frenos"],
        tipoVehiculos: ["Automóvil"],
        foto: "https://images.pexels.com/photos/4489729/pexels-photo-4489729.jpeg",
        estado: "pendiente"
    }),

    new Taller({
        id: 3,
        nombre: "ElectroConfort Automotriz",
        nit: "902345678-3",
        telefono: "3001234569",
        correo: "electroconfort@gmail.com",
        direccion: "Calle 11 #21-50",
        ciudad: "Cali",
        coordenadas: { lat: 3.437587, lng: -76.530549 },
        horarios: {
            dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            apertura: "08:00",
            cierre: "17:00"
        },
        servicios: ["Lujos", "Aceite"],
        tipoVehiculos: ["Automóvil", "Moto"],
        foto: "https://images.pexels.com/photos/7564861/pexels-photo-7564861.jpeg",
        estado: "pendiente"
    }),

    new Taller({
        id: 4,
        nombre: "Costa Motors",
        nit: "903456789-4",
        telefono: "3001234510",
        correo: "cmotor@gmail.com",
        direccion: "Av. Cuartel # 50-2 a 50-170",
        ciudad: "Barranquilla",
        coordenadas: { lat: 10.985534, lng: -74.790074 },
        horarios: {
            dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            apertura: "08:00",
            cierre: "18:00"
        },
        servicios: ["Mecánica general"],
        tipoVehiculos: ["Moto"],
        foto: "https://images.pexels.com/photos/36737257/pexels-photo-36737257.jpeg",
        estado: "pendiente"
    }),

    new Taller({
        id: 5,
        nombre: "SincroMotor Taller Integral",
        nit: "904567890-5",
        telefono: "3001234511",
        correo: "sincromotortaller@gmail.com",
        direccion: "Carrera 67b #45-95",
        ciudad: "Bogotá",
        coordenadas: { lat: 4.656206, lng: -74.100477 },
        horarios: {
            dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            apertura: "08:00",
            cierre: "16:00"
        },
        servicios: ["Mecánica general"],
        tipoVehiculos: ["Automóvil"],
        foto: "https://images.pexels.com/photos/4489718/pexels-photo-4489718.jpeg",
        estado: "pendiente"
    }),

    new Taller({
        id: 6,
        nombre: "ProMecánica Multimarca",
        nit: "905678901-6",
        telefono: "3001234512",
        correo: "Pmecanica@gmail.com",
        direccion: "Calle 33 # 19-2",
        ciudad: "Bucaramanga",
        coordenadas: { lat: 7.118403, lng: -73.122644 },
        horarios: {
            dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            apertura: "07:00",
            cierre: "17:00"
        },
        servicios: ["Mecánica general", "Clutch"],
        tipoVehiculos: ["Moto"],
        foto: "https://images.pexels.com/photos/6720530/pexels-photo-6720530.jpeg",
        estado: "pendiente"
    }),

    new Taller({
        id: 7,
        nombre: "Eje & Pistón Taller",
        nit: "906789012-7",
        telefono: "3001234513",
        correo: "pistontaller@gmail.com",
        direccion: "Calle 40 # 80D - 69",
        ciudad: "Medellín",
        coordenadas: { lat: 6.246880, lng: -75.602378 },
        horarios: {
            dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            apertura: "08:00",
            cierre: "18:00"
        },
        servicios: ["Motor"],
        tipoVehiculos: ["Automóvil"],
        foto: "https://images.pexels.com/photos/4481945/pexels-photo-4481945.jpeg",
        estado: "pendiente"
    }),

    new Taller({
        id: 8,
        nombre: "Brillo Real Taller",
        nit: "907890123-8",
        telefono: "3001234514",
        correo: "brealtaller@gmail.com",
        direccion: "Calle 12c # 33-60",
        ciudad: "Cali",
        coordenadas: { lat: 3.423399, lng: -76.530556 },
        horarios: {
            dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            apertura: "08:00",
            cierre: "17:00"
        },
        servicios: ["Latonería", "pintura"],
        tipoVehiculos: ["Automóvil", "Moto"],
        foto: "https://images.pexels.com/photos/11890956/pexels-photo-11890956.jpeg",
        estado: "pendiente"
    }),

    new Taller({
        id: 9,
        nombre: "Lámina & Color Auto Studio",
        nit: "908901234-9",
        telefono: "3001234515",
        correo: "lcolorstudio@gmail.com",
        direccion: "Calle 69 # 41-2 a 41-14",
        ciudad: "Barranquilla",
        coordenadas: { lat: 10.986989, lng: -74.803959 },
        horarios: {
            dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            apertura: "08:30",
            cierre: "17:30"
        },
        servicios: ["Latonería", "pintura"],
        tipoVehiculos: ["Moto"],
        foto: "https://images.pexels.com/photos/39823759/pexels-photo-39823759.jpeg",
        estado: "pendiente"
    }),

    new Taller({
        id: 10,
        nombre: "RestauroCar Centro de Carrocería",
        nit: "909012345-0",
        telefono: "3001234516",
        correo: "restacar@gmail.com",
        direccion: "Carrera 56 # 22B-2",
        ciudad: "Bogotá",
        coordenadas: { lat: 4.641485, lng: -74.101749 },
        horarios: {
            dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            apertura: "07:30",
            cierre: "17:30"
        },
        servicios: ["Latonería", "pintura"],
        tipoVehiculos: ["Automóvil"],
        foto: "https://images.pexels.com/photos/29181492/pexels-photo-29181492.jpeg",
        estado: "pendiente"
    })
];