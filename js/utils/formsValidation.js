// Funciones de validacion de los inputs en los formularios.

function obtenerCampo(campo, selector) {
	return typeof campo === "string" ? document.querySelector(campo) : campo || document.querySelector(selector);
}

function returnAlertaPersonalizada(mensaje){
	return `
	<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
	<symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
		<path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
	</symbol>
	</svg>
	
	<div class="alert alert-warning d-flex align-items-center" role="alert">
		<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
		<div>
		${mensaje}
		</div>
	</div>`
}

function generaAlerta(esValido, input, mensaje) {
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
