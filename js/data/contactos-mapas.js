import { talleresMock } from './garageMock.js';

function iniciarMapa() {
  const caja = document.getElementById('mapa-publico');
  if (!caja) return;

  //caja principal del mapa
  caja.className = 'w-100 position-relative bg-light rounded-4 overflow-hidden shadow-sm';
  caja.style.height = '500px';

  //menú desplegable de los talleres
  const opciones = talleresMock.map((t, i) => 
    `<option value="${i}">📍 Sede: ${t.nombre}</option>`
  ).join('');

  // calles, pin y la tarjeta
  caja.innerHTML = `
    <style>
      @keyframes saltar { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      .pin { animation: saltar 2s infinite; transition: all 0.6s ease; z-index: 10; }
      #ciudad { transition: transform 0.8s ease; width: 200%; height: 200%; top: -50%; left: -50%; }
    </style>

    <select id="lista-sedes" class="form-select position-absolute top-0 start-50 translate-middle-x mt-3 shadow rounded-pill fw-bold text-primary" style="width: 90%; z-index: 20;">
      ${opciones}
    </select>

    <!-- Fondo de ciudad que se desliza -->
    <div id="ciudad" class="position-absolute" style="background-color: #f4f3f0;">
      <div class="position-absolute bg-success-subtle rounded-4" style="width: 180px; height: 120px; top: 25%; left: 25%;"></div>
      <div class="position-absolute bg-success-subtle rounded-4" style="width: 200px; height: 130px; top: 58%; left: 58%;"></div>
      <div class="position-absolute bg-white" style="width: 35px; height: 100%; left: 32%;"></div>
      <div class="position-absolute bg-white" style="width: 35px; height: 100%; left: 68%;"></div>
      <div class="position-absolute bg-white" style="width: 100%; height: 35px; top: 35%;"></div>
      <div class="position-absolute bg-warning opacity-75" style="width: 100%; height: 14px; top: 55%;"></div>
      <div class="position-absolute bg-warning opacity-75" style="width: 14px; height: 100%; left: 48%;"></div>
    </div>

    <!-- Pin marcador -->
    <div id="pin" class="position-absolute text-center pin" style="left: 45%; top: 38%;">
      <div style="font-size: 38px;">📍</div>
      <span id="pin-nombre" class="badge bg-dark rounded-pill shadow"></span>
      <small id="pin-dir" class="badge bg-white text-dark border d-block mt-1"></small>
    </div>

    <!-- Tarjeta inferior -->
    <div id="tarjeta" class="position-absolute bottom-0 start-50 translate-middle-x mb-3 bg-white p-3 rounded-4 shadow text-center" style="width: 90%; z-index: 20;"></div>
  `;

  // funcion para que se mueva el mapa según el taller elegido
  function cambiarSede(indice) {
    const taller = talleresMock[indice];
    const { lat, lng } = taller.coordenadas;

    const posX = Math.min(Math.max(((lng + 74.15) / 0.13) * 40 + 25, 25), 65);
    const posY = Math.min(Math.max(((4.75 - lat) / 0.17) * 30 + 25, 25), 55);

    // mover el mapa -- calles y pin
    document.getElementById('ciudad').style.transform = `translate(${45 - posX}%, ${40 - posY}%)`;
    const pin = document.getElementById('pin');
    pin.style.left = posX + '%';
    pin.style.top = posY + '%';

    document.getElementById('pin-nombre').innerText = taller.nombre;
    document.getElementById('pin-dir').innerText = taller.direccion;
    document.getElementById('tarjeta').innerHTML = `
      <h6 class="fw-bold mb-1">🔧 ${taller.nombre}</h6>
      <p class="small text-muted mb-1"><strong>Dirección:</strong> ${taller.direccion}</p>
      <p class="small text-muted mb-0"><strong>Teléfono:</strong> ${taller.telefono}</p>
    `;
  }

  // usuario cambia de taller
  document.getElementById('lista-sedes').onchange = (e) => cambiarSede(e.target.value);
  cambiarSede(0);
}

iniciarMapa();
