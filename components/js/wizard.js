const TOTAL = 6;
let actual = 0;
const datos = {}; // aquí guardarás lo que llene el usuario

// Las rutas se resuelven respecto a ESTE archivo JS, no a la página
const base = new URL('../', import.meta.url);

async function cargarHTML(ruta) {
  const res = await fetch(new URL(ruta, base));
  if (!res.ok) throw new Error(`No se pudo cargar ${ruta} (${res.status})`);
  return res.text();
}

async function cargarPasos() {
  const body = document.getElementById('wizardBody');
  try {
    const htmls = await Promise.all(
      Array.from({ length: TOTAL }, (_, i) => cargarHTML(`steps/paso${i + 1}.html`))
    );
    htmls.forEach((html) => {
      const div = document.createElement('div');
      div.className = 'paso d-none';
      div.innerHTML = html;
      body.appendChild(div);
    });
    mostrarPaso(0);
  } catch (error) {
    console.error(error);
    body.innerHTML = '<p class="text-danger">No se pudo cargar el formulario.</p>';
  }
}

function mostrarPaso(n) {
  actual = n;
  document.querySelectorAll('#wizardBody .paso')
    .forEach((p, i) => p.classList.toggle('d-none', i !== n));
  document.querySelectorAll('#wizardStepper .wizard-step').forEach((s, i) => {
    s.classList.toggle('active', i === n);
    s.classList.toggle('completed', i < n);
  });
  document.getElementById('btnAtras').disabled = n === 0;
  document.getElementById('btnSiguiente').textContent =
    n === TOTAL - 1 ? 'Guardar' : 'Siguiente';
}

function siguiente() {
  if (actual < TOTAL - 1) mostrarPaso(actual + 1);
  else console.log('Guardar', datos); // aquí irá el envío final
}

function atras() {
  if (actual > 0) mostrarPaso(actual - 1);
}

async function iniciarWizard() {
  try {
    // 1. Inyectar el contenedor del modal
    document.getElementById('modalContainer').innerHTML =
      await cargarHTML('template/modal-container.html');

    // 2. Ahora sí existe en el DOM: enlazar todo
    document.getElementById('btnSiguiente').addEventListener('click', siguiente);
    document.getElementById('btnAtras').addEventListener('click', atras);
    document.getElementById('modalTaller')
      .addEventListener('show.bs.modal', cargarPasos, { once: true });
  } catch (error) {
    console.error(error);
  }
}

iniciarWizard();