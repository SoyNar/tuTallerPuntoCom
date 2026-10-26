const MAX_MB = 5;
const TIPOS = ['image/jpeg', 'image/png'];
let coverUrl = null;   // URL temporal de la foto elegida


/** Foto de portada: validar, mostrar miniatura y soportar arrastrar y soltar. */
export function initPhotos() {
  const input = document.getElementById('tallerFotos');
  const zone = document.querySelector('.wizard-upload');
  if (!input || !zone) return;

  input.addEventListener('change', () => setCover(input.files[0], input));

  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const dt = new DataTransfer();      // el input solo acepta un FileList
    dt.items.add(file);
    input.files = dt.files;
    setCover(file, input);
  });
}

function setCover(file, input) {
  const nota = document.querySelector('.wizard-upload-nota');
  if (!file) return;

  // Archivo no permitido: se descarta y se vuelve al estado inicial
  if (!TIPOS.includes(file.type) || file.size > MAX_MB * 1024 * 1024) {
    input.value = '';
    clearCover();
    nota.textContent = `Solo JPG o PNG de máximo ${MAX_MB} MB`;
    nota.classList.add('text-danger');
    document.querySelector('.wizard-upload')?.classList.remove('invalido');
    return;
  }

  nota.textContent = file.name;
  nota.classList.remove('text-danger');

  if (coverUrl) URL.revokeObjectURL(coverUrl);   // libera la anterior
  coverUrl = URL.createObjectURL(file);

  const mini = document.getElementById('fotoMiniatura');
  mini.src = coverUrl;
  mini.classList.remove('d-none');
  document.getElementById('fotoIcono').classList.add('d-none');
}

function resetMiniatura() {
  document.getElementById('fotoMiniatura')?.classList.add('d-none');
  document.getElementById('fotoIcono')?.classList.remove('d-none');
}

/** Quita la foto elegida y deja la zona de carga como al inicio. */
export function clearCover() {
  if (coverUrl) URL.revokeObjectURL(coverUrl);
  coverUrl = null;
  resetMiniatura();

  const nota = document.querySelector('.wizard-upload-nota');
  if (nota) {
    nota.textContent = 'JPG o PNG, máximo 5 MB';
    nota.classList.remove('text-danger');
  }
}



/** Textos de las etiquetas de los inputs marcados con ese name. */
function checkedLabels(name) {
  return [...document.querySelectorAll(`[name="${name}"]:checked`)]
    .map(i => document.querySelector(`label[for="${i.id}"]`)?.textContent.trim())
    .filter(Boolean);
}

/** Escribe el dato real en su fila; si falta, deja el aviso en gris. */
function setRow(clave, valor, textoVacio) {
  const fila = document.querySelector(`[data-check="${clave}"]`);
  if (!fila) return;

  const ok = !!valor;
  const marca = fila.querySelector('.wizard-check');
  const texto = fila.querySelector('.wizard-valor');

  marca.textContent = ok ? '●' : '○';
  marca.classList.toggle('ok', ok);
  texto.textContent = ok ? valor : textoVacio;    // textContent, nunca innerHTML
  texto.classList.toggle('vacio', !ok);
}

/** Llena la vista previa (paso 5) con lo que hay en el formulario. */
export function fillPreview() {
  const val = (sel) => document.querySelector(sel)?.value.trim() ?? '';

  const nombre = val('#tallerNombre');
  const direccion = [val('#taller-direccion'), val('#taller-ciudad')]
    .filter(Boolean).join(', ');
  const servicios = checkedLabels('servicios').join(', ');
  const lat = val('[name="latitud"]');     // ajusta los name a los de tu mapa
  const lng = val('[name="longitud"]');

  // Título y dirección de la tarjeta
  document.getElementById('previewNombre').textContent = nombre || 'Nombre del taller';
  document.getElementById('previewDireccion').textContent = direccion || 'Dirección pendiente';

  // Lista: dato real o aviso si falta
  setRow('nombre',    nombre,                              'Nombre del taller');
  setRow('direccion', direccion,                           'Dirección');
  setRow('servicio',  servicios,                           'Al menos un servicio');
  setRow('mapa',      lat && lng ? `${lat}, ${lng}` : '',  'Ubicación en el mapa');
  setRow('estado',    checkedLabels('estado')[0] ?? '',    'Estado');

  // Portada
  const img = document.getElementById('previewImg');
  if (img) {
    img.src = coverUrl ?? img.dataset.default;
    img.classList.toggle('es-foto', !!coverUrl);
  }
}

/**
 * Valida la foto de portada.
 * @param {Object} opts  { required: boolean }
 * @returns {Function} validate() -> boolean
 */
export function validatePhoto({ required = false } = {}) {
  const input = document.getElementById('tallerFotos');
  const zone = document.querySelector('.wizard-upload');
  const nota = document.querySelector('.wizard-upload-nota');
  if (!input || !zone) return;

  return () => {
    const ok = !required || input.files.length > 0;
    zone.classList.toggle('invalido', !ok);

    if (!ok) {
      nota.textContent = 'Agrega una foto de portada.';
      nota.classList.add('text-danger');
    }
    return ok;
  };
}
// Portada
const img = document.getElementById('previewImg');
if (img) {
  img.src = coverUrl ?? img.dataset.default;
  img.closest('.wizard-preview-portada')?.classList.toggle('con-foto', !!coverUrl);
}