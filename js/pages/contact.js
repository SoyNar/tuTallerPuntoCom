// Ejecuta las validaciones para el fomulario contacto.
import { validarAsunto, validarCorreo, validarNombre, validarTelefono, validarMensaje } from "../utils/formsValidation.js";
import { contarCaracteresHTML } from "../utils/charCountToHTML.js";

// Inputs
const inptNombre = document.getElementById('campo-nombre')
const inptEmail = document.getElementById('campo-email')
const inptAsunto = document.getElementById('campo-asunto')
const inptTelefono = document.getElementById('campo-telefono')
const inptMensaje = document.getElementById('campo-mensaje')
// Elemntos a dinamizar
const containerCaracteres = document.getElementById('caracteres')
// Validaciones
validarNombre(inptNombre)
validarCorreo(inptEmail)
validarAsunto(inptAsunto)
validarTelefono(inptTelefono)
validarMensaje(inptMensaje)

// Conteo de caracteres
inptMensaje.addEventListener('input', ()=> 
    contarCaracteresHTML(containerCaracteres, inptMensaje, 1000))


