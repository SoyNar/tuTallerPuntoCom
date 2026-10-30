
const RULES = {
    required:(v) => v.trim() !== '',
    min: (v,n) => v.trim().length >= n,
    max: (v,n) => v.trim().length <= n,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    phone: (v) => v.replace(/\D/g, '').replace(/^57/, '').length === 10,
    digits: (v,[a,b]) => { const n = v.replace(/\D/g, '').length; return n >= a && n <= b; },
    noCode: (v) => !/[<>{}\\]/.test(v),
    patron: (v, re) => re.test(v),
    later:(v,sel) =>  v > (document.querySelector(sel)?.value ?? '')
}

const MESSAGGES = {
    required: 'Este campo es obligatorio',
    min: (n) => `Minimo ${n} caracteres`,
    max: (n) => `Maximo ${n} caracteres `,
    email:  'Ingrse in correo valido de contener @ y dominio',
    phone: 'Ingrese un telefono de 10 digitos',
    digits: ([a,b]) => `Ingrese entre ${a} y ${b} digitos`,
    noCode: 'No se permiten los caracteres < > { } \\.',
    patron: 'Formato invalido.',
    later: 'EL valor debe ser posterior al campo anterior'
}

function paint(isValid, input, message, withBorder = true) {
    const container = input.closest('div');
    let alert = container.querySelector('.alerta-validacion');

    if (!isValid) {
        if (!alert) {
            alert = document.createElement('div');
            alert.classList.add('alerta-validacion');
            container.appendChild(alert);
        }

        if (withBorder) {
            input.classList.remove('border-success');
            input.classList.add('border', 'border-warning');
        } else {
            input.classList.remove('border', 'border-warning', 'border-success');
        }

        alert.innerHTML = `
          <small class="d-block mt-1" style="color: var(--color-accent); font-size: 0.75rem;">
            <i class="bi bi-exclamation-triangle-fill"></i> ${message}
          </small>`;

        return false;
    }

    alert?.remove();

    if (withBorder) {
        input.classList.remove('border-warning');
        input.classList.add('border', 'border-success');
    } else {
        input.classList.remove('border', 'border-warning', 'border-success');
    }

    return true;
}

    /**
     * Validar un campo contra  una lista de reglas 
     * se detiene en la primera que falla
     * 
     * @param {string|HTMLElement} field selector o elmento
     * @param {Array} rules [requerido , min , max]
     * @param {object} messages opcional : {min: texto requerido}
     * @returns {Function|undefined} funcion validar() 
     */

     export function validateField(field, rules, messages = {})
     {
        const input = typeof field === 'string' ? document.querySelector(field) : field; 
        let touched = false;
        if(!input) return;

        const validate = () => {
            touched = true;
            for (const rule of rules){
                const [name, arg] = Array.isArray(rule) ? rule : [rule];

                if(!RULES[name]){
                    console.error(`Regla desconocida: ${name}`);
                    continue;
                }

                if(RULES[name](input.value, arg)) continue;
                const msg = messages[name] ?? MESSAGGES[name];
                return paint(false, input, typeof msg === 'function' ? msg(arg): msg);
            }

            return paint(true,input,'');
        }
        input.addEventListener('blur',validate);
        input.addEventListener('input', () => {
            if(touched) validate();
            
        })
        return validate;

     }


     /**
      * valida un grupo de checkboxes  minimo de marcados
      * @param {string|HTMLElement} container div que envuelve los inputs
      * @param {string} name name de los inputs
      * @param {number} min cuantos deberian estar marcados
      * @param {string} message 
      * 
      */

     export function validateGroup(container,name,min,message)
     {
        const box = typeof container === 'string' ? document.querySelector(container) : container;
        if(!box) return;

        const validate = () => {
            const checked = box.querySelectorAll(`[name="${name}"]:checked`).length;
            const ok = checked >= min; 
            box.classList.toggle('grupo-invalido', !ok);
            return paint(ok, box, message,false);

        }

        box.addEventListener('change',validate);
        return validate;

     }

    


