import {generaAlerta } from '../../js/utils/formsValidation.js'
/**
 * Lógica de captación de datos del formulario del wizard.
 * - recogerDatos: lee todos los pasos con FormData.
 * - validarHorario: valida días y horas (lo que validaciones.js no cubre).
 */
const MULTIPLES = ['dias', 'servicios'];


/** Reduce la imagen y la devuelve como texto (Data URL) para poder guardarla. */
function comprimirImagen(file, maxLado = 800, calidad = 0.8) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const escala = Math.min(1, maxLado / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * escala);
      canvas.height = Math.round(img.height * escala);

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff';                       
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', calidad));
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('No se pudo leer la imagen'));
    };
    img.src = url;
  });
}

/**
 * Lee los datos de los pasos con FormData y devuelve un objeto.
 * @returns {Object} datos
 */
export async function recogerDatos() {
  const form = document.getElementById('formTaller');
  const fd = new FormData(form);

  const datos = {
    name: fd.get('nombre'),
    nit: fd.get('nit'),
    phone: fd.get('telefono'),
    email: fd.get('correo'),
    address: fd.get('direccion'),
    city: fd.get('ciudad'),
    latitude: Number(fd.get('latitud')),
    longitude: Number(fd.get('longitud')),
    typeVehicle: fd.get('tipoVehiculo'),
  };

  const foto = fd.get('fotos');
  return {
    datos,
    foto: foto instanceof File && foto.size > 0 ? foto : null,
  };
}

/**
 * Valida el paso de horarios: al menos un día y cierre posterior a apertura.
 * @returns {boolean} true si es válido
 */
export function validarHorario() {
  const contenedorDias = document.querySelector('#diasAtencion');
  if (!contenedorDias) return true;   // el paso no cargó: no bloquea

  const paso = contenedorDias.closest('.paso');
  const hayDias = paso.querySelectorAll('[name="dias"]:checked').length > 0;
  const apertura = paso.querySelector('[name="apertura"]');
  const cierre = paso.querySelector('[name="cierre"]');

  const diasOk = generaAlerta(hayDias, contenedorDias, 'Selecciona al menos un día.');
  const horaOk = generaAlerta(
    cierre.value > apertura.value,
    cierre,
    'La hora de cierre debe ser posterior a la de apertura.'
  );

  return diasOk && horaOk;
}