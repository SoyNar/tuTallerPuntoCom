// Ejecuta las validaciones para el fomulario contacto.
import { validarAsunto, validarCorreo, validarNombre, validarTelefono, validarMensaje } from "../pages/formsValidation.js";

// Inputs
const inptNombre = document.getElementById('campo-nombre')
const inptEmail = document.getElementById('campo-email')
//asunto
const inptTelefono = document.getElementById('campo-telefono')
const inptMensaje = document.getElementById('campo-mensaje')

// Validaciones
validarNombre(inptNombre)
validarCorreo(inptEmail)
//validarAsunto()
validarTelefono(inptTelefono)
validarMensaje(inptMensaje)


