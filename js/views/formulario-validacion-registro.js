import { validateField, validarFormulario, validateGroup } from '../utils/GeneralValidatorForm.js';
import { registrar, redirigirPorRol } from '../../services/auth-service.js';
import { iniciarVehiculos } from './registrarVehiculos.js';

const form = document.querySelector('#formRegistro');
const vehiculos = iniciarVehiculos();

const validadores = [
  validateField('#nombre',         ['required', ['min', 2], ['max', 60], 'noCode']),
  validateField('#correo',         ['required', 'email']),
  validateField('#telefono',       ['required', 'phone']),
  validateField('#clave',          ['required', ['min', 8]]),
  validateField('#confirmarClave', ['required', ['match', '#clave']]),
  validateGroup('#grupo-terminos', 'terminos', 1, 'Debes aceptar los términos'),
];

form.addEventListener('submit', async e => {
  e.preventDefault();

  if (!vehiculos.validar()) return;
  if (!validarFormulario(validadores)) return;

  const datos = {
    nombre: form.nombre.value.trim(),
    correo: form.correo.value.trim(),
    telefono: form.telefono.value.trim(),
    clave: form.clave.value,
    vehiculos: vehiculos.obtener(),
  };

  try {
    const usuario = await registrar(datos);
    redirigirPorRol(usuario.rol);
  } catch (err) {
    alert(err.message);
  }
});