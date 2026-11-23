import { validateField, validarFormulario, validateGroup } from '../utils/GeneralValidatorForm.js';
import { registrar, redirigirPorRol } from '../../services/auth-service.js';
import { iniciarVehiculos } from './registrarVehiculos.js';
import { mostrarCargando, ocultarCargando } from '../utils/loader.js';
import { showToast } from '../utils/toast-modal.js';

const form = document.querySelector('#formRegistro');
const vehiculos = iniciarVehiculos();

const validadores = [
  validateField('#nombre',         ['required', ['min', 2], ['max', 60], 'noCode']),
  validateField('#apellidos', [['max', 60], 'noCode']),
  validateField('#correo',         ['required', 'email']),
  validateField('#telefono',       ['required', 'phone']),
  validateField('#clave',          ['required', ['min', 8]]),
  validateField('#confirmarClave', ['required', ['match', '#clave']]),
  validateGroup('#grupo-terminos', 'terminos', 1, 'Debes aceptar los términos'),
  validateField('#direccion', ['required', ['max', 120]]),
];

form.addEventListener('submit', async e => {
  e.preventDefault();

  if (!vehiculos.validar()) return;
  if (!validarFormulario(validadores)) return;

  const datos = {
    name: form.nombre.value.trim(),
    lastname: form.apellidos.value.trim(),
    email: form.correo.value.trim(),
    phone: form.telefono.value.trim(),
    address: form.direccion.value.trim(),
    password: form.clave.value,
    vehicles: vehiculos.obtener(),
  };
    mostrarCargando('Procesando Solicitud...');
  try {
    const usuario = await registrar(datos);
    redirigirPorRol(usuario.role);
  } catch (err) {
    showToast(err.message, 'error', 'No pudimos registrar el usuario');
  } finally {
    ocultarCargando();
  }
});