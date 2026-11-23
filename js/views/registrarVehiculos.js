const PLACA_VALIDA = /^([A-Z]{3}\d{3}|[A-Z]{3}\d{2}[A-Z])$/;

export function iniciarVehiculos() {
  const vehiculos = [];

  const tipo = document.getElementById('tipoVehiculo');
  const marca = document.getElementById('marca');
  const modelo = document.getElementById('modelo');
  const placa = document.getElementById('placa');
  const btnAgregar = document.getElementById('btnAgregarVehiculo');
  const lista = document.getElementById('listaVehiculos');
  const contador = document.getElementById('contadorVehiculos');
  const errorMarca = document.getElementById('errorMarca');
  const errorModelo = document.getElementById('errorModelo');
  const errorPlaca = document.getElementById('errorPlaca');
  const errorVehiculos = document.getElementById('errorVehiculos');

  function mostrarError(input, elementoError, mensaje) {
    elementoError.textContent = mensaje;
    elementoError.hidden = false;
    input.classList.add('is-invalid');
    input.focus();
    return false;
  }

  function limpiarError(input, elementoError) {
    elementoError.hidden = true;
    input.classList.remove('is-invalid');
  }

  function limpiarTodosLosErrores() {
    limpiarError(marca, errorMarca);
    limpiarError(modelo, errorModelo);
    limpiarError(placa, errorPlaca);
    errorVehiculos.hidden = true;
  }

  function agregar() {
    limpiarTodosLosErrores();

    const marcaValor = marca.value.trim();
    const modeloValor = modelo.value.trim();
    const placaValor = placa.value.trim().toUpperCase();

    if (!marcaValor) {
      return mostrarError(marca, errorMarca, 'Escribe la marca del vehículo.');
    }
    if (!modeloValor) {
      return mostrarError(modelo, errorModelo, 'Escribe el modelo del vehículo.');
    }
    if (!PLACA_VALIDA.test(placaValor)) {
      return mostrarError(placa, errorPlaca, 'Escribe una placa válida (ej. ABC123 o ABC12D).');
    }
    if (vehiculos.some(v => v.plate === placaValor)) {
      return mostrarError(placa, errorPlaca, 'Ese vehículo ya está agregado.');
    }

    vehiculos.push({
      typeVehicle: tipo.value,
      brand: marcaValor,
      model: modeloValor,
      plate: placaValor,
    });

    marca.value = '';
    modelo.value = '';
    placa.value = '';
    marca.focus();
    render();
    return true;
  }

  function quitar(index) {
    vehiculos.splice(index, 1);
    render();
  }

  function render() {
    lista.replaceChildren();

    vehiculos.forEach((v, i) => {
      const chip = document.createElement('span');
      chip.className = 'chip-vehiculo badge rounded-pill d-inline-flex align-items-center gap-2 py-2 px-3 fw-semibold';

      const icono = document.createElement('i');
      icono.className = v.typeVehicle === 'MOTO' ? 'bi bi-scooter' : 'bi bi-car-front-fill';

      const texto = document.createElement('span');
      texto.textContent = `${v.brand} ${v.model} · ${v.plate}`;

      const btnQuitar = document.createElement('button');
      btnQuitar.type = 'button';
      btnQuitar.className = 'btn-quitar-vehiculo';
      btnQuitar.setAttribute('aria-label', `Quitar ${v.plate}`);
      btnQuitar.innerHTML = '<i class="bi bi-x-lg"></i>';
      btnQuitar.addEventListener('click', () => quitar(i));

      chip.append(icono, texto, btnQuitar);
      lista.append(chip);
    });

    contador.textContent = vehiculos.length;
  }

  btnAgregar.addEventListener('click', agregar);

  placa.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      agregar();
    }
  });

  return {
    validar() {
      const hayDatosSinAgregar = marca.value.trim() || modelo.value.trim() || placa.value.trim();
      if (hayDatosSinAgregar && !agregar()) return false;

      if (vehiculos.length === 0) {
        errorVehiculos.hidden = false;
        return false;
      }
      return true;
    },
    obtener: () => vehiculos.map(v => ({ ...v })),
  };
}