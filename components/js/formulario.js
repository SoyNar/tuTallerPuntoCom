
/**
 * logica de captación de datos del formulario
 * est3e archivo hace lectura y validación del formulario del wizard
 * 
 */
const MULTIPLES = ['dias', 'servicios'];

/*
 * Lee los datos de los pasos con formData y devuelve un objeto 
 * @returns datos
 */
export function recogerDatos(){
    const fd = new FormData(document.getElementById('formTaller'));
    const datos = {};


    for(const clave  of new Set(fd.keys())){
        datos[clave] = MULTIPLES.includes(clave) ? fd.getAll(clave) : fd.get(clave);
    }

    return datos;
}

/**
 * Metodo para revisar los campos del formulario de cada paso  marca con clas id-invalid
 * los qu eno cumplen devuelve true si es valido
 * @returns valido
 */
export function validarPaso(n){
    const paso = document.querySelectorAll('#wizardBody .paso')[n];
    let valido = true;

    paso.querySelectorAll('input, select, textarea').forEach((c) => {
        const ok = c.checkVisibility();
        c.classList.toggle('is-invalid', !ok)
    });

    if (paso.querySelector('[name="dias"]')) {
    const hayDias = paso.querySelectorAll('[name="dias"]:checked').length > 0;
    const apertura = paso.querySelector('[name="apertura"]').value;
    const cierre = paso.querySelector('[name="cierre"]').value;
    if (!hayDias || cierre <= apertura) valido = false;
  }

  return valido;
}