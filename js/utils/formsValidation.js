// Funciones de validacion de los inputs en los formularios.

function obtenerCampo(campo, selector) {
	return typeof campo === "string" ? document.querySelector(campo) : campo || document.querySelector(selector);
}

function returnAlertaPersonalizada(mensaje){
	return `
	<small class="d-block mt-1" style="color: var(--color-accent); font-size: 0.75rem;"><i class="bi bi-exclamation-triangle-fill"></i> ${mensaje}</small>`
}

 export function generaAlerta(esValido, input, mensaje) {
	const padre = input.closest('div');
	let alerta = padre.querySelector('.alerta-validacion');

	if (!esValido) {
				// Crear la alerta si no existe.
				if (!alerta) {
					alerta = document.createElement('div');
					alerta.classList.add('alerta-validacion');
					padre.appendChild(alerta);
					input.classList.add('border')
					input.classList.add('border-warning')
				}
			
				alerta.innerHTML = returnAlertaPersonalizada(
					`${mensaje}`
				);

				return false;
			}
			//  elimina la alerta
			if (alerta) {
				input.classList.remove('border')
				input.classList.remove('border-warning')
				alerta.remove();
			}
			// Agrega indicador de input correcto.
			input.classList.add('border')
			input.classList.add('border-success')
			return true;
}

export function validarNombre(campo) {
		const input = obtenerCampo(campo, "#nombre");
		if (!input) return;

		const validar = () => {
						
			// Valida el campo contiene lo necesario.
			const nombre = input.value.trim();
			const esValido = /^(?:\p{L}+\s+)+\p{L}+$/u.test(nombre);
			const mensaje = 'Ingrese al menos dos palabras y use solo letras.'

			// Genera la alerta.
			return generaAlerta(esValido, input, mensaje)
		};

	input.addEventListener("change", validar);
	return validar;
}

export function validarCorreo(campo) {
	const input = obtenerCampo(campo, "#correo");
	if (!input) return;

	const validar = () => {
		// Valida el correo.
		const correo = input.value.trim();
		const esValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
		const mensaje = 'Ingrese un correo valido: debe contener @ y un dominio.'

		// Genera la alerta.
		return generaAlerta(esValido, input, mensaje )
	};

	input.addEventListener("change", validar);
	return validar;
}

export function validarAsunto(campo) {
	const input = obtenerCampo(campo, "#asunto");
	if (!input) return;

	const validar = () => {
		const esValido = input.value !== 'Selecciona un asunto';
        const mensaje = 'Seleccione un asunto.'
		// Agrega Alerta
		return generaAlerta(esValido, input, mensaje)
	};

	input.addEventListener("change", validar);
	return validar;
}

export function validarTelefono(campo) {
	const input = obtenerCampo(campo, "#telefono");
	if (!input) return;

	const validar = () => {
		let digitos = input.value.replace(/\D/g, "");
		if (digitos.startsWith("57")) digitos = digitos.slice(2);
		digitos = digitos.slice(0, 10);
		input.value = `+57${digitos}`;

		const esValido = digitos.length === 10;
		const mensaje = 'Ingrese un telefono correcto de 10 digitos numericos.'
        
		return generaAlerta(esValido, input, mensaje)
	};

	input.addEventListener("change", validar);
	return validar;
}

export function validarMensaje(campo) {
	const input = obtenerCampo(campo, "#asunto");
	if (!input) return;

	const validar = () => {
		const esValido = input.value.length <= 1000 && input.value.length > 0;
        // Cambiar a agregar un elemento abajo del input.
		const mensaje = "El asunto no puede exceder los 1000 caracteres, ni estar vacio."
		return generaAlerta(esValido, input, mensaje);
	};

	input.addEventListener("change", validar);
	return validar;
}
