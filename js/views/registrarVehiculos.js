const PLACA_VALIDA = /^([A-Z]{3}\d{3}|[A-Z]{3}\d{2}[A-Z])$/;
const vehiculos = [];

export function iniciarVehiculos() {
  const tipo = document.getElementById('tipoVehiculo');
  const placa = document.getElementById('placa');
  const btnAgregar = document.getElementById('btnAgregarVehiculo');
  const lista = document.getElementById('listaVehiculos');
  const contador = document.getElementById('contadorVehiculos');
  const errorPlaca = document.getElementById('errorPlaca');

  function mostrarErrorPlaca(mensaje) {
    errorPlaca.textContent = mensaje;
    errorPlaca.hidden = false;
    placa.classList.add('is-invalid');
    placa.focus();
    return false;
  }

  function limpiarErrorPlaca() {
    errorPlaca.hidden = true;
    placa.classList.remove('is-invalid');
  }

  function agregar() {
    const valor = placa.value.trim().toUpperCase();
    limpiarErrorPlaca();

    if (!PLACA_VALIDA.test(valor)) {
      return mostrarErrorPlaca('Escribe una placa válida (ej. ABC123 o ABC12D).');
    }
    if (vehiculos.some(v => v.placa === valor)) {
      return mostrarErrorPlaca('Ese vehículo ya está agregado.');
    }

    vehiculos.push({ tipo: tipo.value, placa: valor });
    placa.value = '';
    placa.focus();
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
        icono.className = v.tipo === 'Moto' ? 'bi bi-scooter' : 'bi bi-car-front-fill';

        const texto = document.createElement('span');
        texto.textContent = `${v.tipo} · ${v.placa}`;

        const btnQuitar = document.createElement('button');
        btnQuitar.type = 'button';
        btnQuitar.className = 'btn-quitar-vehiculo';
        btnQuitar.setAttribute('aria-label', `Quitar ${v.placa}`);
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
      if (placa.value.trim() && !agregar()) return false;
      if (vehiculos.length === 0) {
        mostrarErrorPlaca('Agrega al menos un vehículo.');
        return false;
      }
      return true;
    },
    obtener: () => vehiculos.map(v => ({ ...v })), 
  };
}