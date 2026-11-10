import { validateField, validarFormulario } from '../utils/GeneralValidatorForm.js';
import { login, redirigirPorRol } from '../../services/auth-service.js';
import { sembrarUsuariosDemo } from '../views/api-fake.js';
import { mostrarCargando, ocultarCargando } from '../utils/loader.js';
import { showToast } from '../utils/toast-modal.js';

sembrarUsuariosDemo(); // provisional


const form = document.querySelector('#formLogin');

const validadores = [
  validateField('#correo', ['required', 'email']),
  validateField('#clave', ['required']),
];

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validarFormulario(validadores)) return;

  mostrarCargando('Iniciando sesión...');
  try {
    const usuario = await login({
      correo: form.correo.value.trim(),
      clave: form.clave.value,
    });
    redirigirPorRol(usuario.rol);
  } catch (err) {
    showToast(err.message, 'error', 'No pudimos iniciar sesión');
  } finally {
    ocultarCargando();
  }
});