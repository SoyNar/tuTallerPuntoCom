// Funciones de validacion de los inputs en los formularios.

function obtenerCampo(campo, selector) {
	return typeof campo === "string" ? document.querySelector(campo) : campo || document.querySelector(selector);
}

function validarNombre(campo) {
	const input = obtenerCampo(campo, "#nombre");
	if (!input) return;

	const validar = () => {
		const nombre = input.value.trim();
		const esValido = /^(?:\p{L}+\s+){1,}\p{L}+$/u.test(nombre);
        // Cambiar a agregar un elemento abajo del input.
		alert(esValido ? "Nombre válido." : "Ingrese al menos dos palabras y use solo letras.");
		return esValido;
	};

	input.addEventListener("change", validar);
	return validar;
}

function validarCorreo(campo) {
	const input = obtenerCampo(campo, "#correo");
	if (!input) return;

	const validar = () => {
		const correo = input.value.trim();
		const esValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
        // Cambiar a agregar un elemento abajo del input.
		alert(esValido ? "Correo válido." : "Ingrese un correo con arroba y dominio.");
		return esValido;
	};

	input.addEventListener("change", validar);
	return validar;
}

function validarAsunto(campo) {
	const input = obtenerCampo(campo, "#asunto");
	if (!input) return;

	const validar = () => {
		const esValido = input.value.length <= 100;
        // Cambiar a agregar un elemento abajo del input.
		alert(esValido ? "Asunto válido." : "El asunto no puede exceder los 100 caracteres.");
		return esValido;
	};

	input.addEventListener("change", validar);
	return validar;
}

function validarTelefono(campo) {
	const input = obtenerCampo(campo, "#telefono");
	if (!input) return;

	const validar = () => {
		let digitos = input.value.replace(/\D/g, "");
		if (digitos.startsWith("57")) digitos = digitos.slice(2);
		digitos = digitos.slice(0, 10);
		input.value = `+57${digitos}`;

		const esValido = digitos.length === 10;
        // Cambiar a agregar un elemento abajo del input.
		alert(esValido ? "Teléfono válido." : "Ingrese un teléfono de 10 dígitos.");
		return esValido;
	};

	input.addEventListener("change", validar);
	return validar;
}
