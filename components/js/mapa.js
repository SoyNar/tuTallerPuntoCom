/**
 * mapa.js:  este archivo tiene la logica para pintar el mapa del paso "Ubicación" del wizard.
 *
 * Usa Leaflet 1.9.4 (https://leafletjs.com), cargado por CDN en admin.html
 * antes de wizard.js; crea la variable global `L`.
 * Las imágenes del mapa son de OpenStreetMap.
 * El mapa se crea al llegar al paso 2, no antes, porque oculto no tiene tamaño.
 */
let mapa = null;
let pin = null;
let controlador = null;

const INICIO = [6.2442, -75.581];

function crearMapa() {
  const latInput = document.getElementById('taller-latitud');
  const lngInput = document.getElementById('taller-longitud');

  mapa = L.map('mapa-taller').setView(INICIO, 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(mapa);

  pin = L.marker(INICIO, { draggable: true }).addTo(mapa);

  const actualizar = ({ lat, lng }) => {
    latInput.value = lat.toFixed(5);
    lngInput.value = lng.toFixed(5);
    rellenarDireccion(lat,lng);
  };

  mapa.on('click', (e) => {
    pin.setLatLng(e.latlng);
    actualizar(e.latlng);
  });
  pin.on('dragend', () => actualizar(pin.getLatLng()));
}

 async  function rellenarDireccion(lat,lng){
    const input = document.getElementById('taller-direccion');
    if(input.dataset.manual === 'true') return;
    controlador?.abort();
    controlador = new AbortController();

    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2` +
              `&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=es`;

   try{
    const res = await fetch(url, {signal: controlador.signal})
    if(!res.ok) throw new Error(`Respuesta : ${res.status}`);
    const data  = await res.json();
    const a  = data.address ?? {};

const calle = [a.road, a.house_number].filter(Boolean).join(' ');
    const barrio = a.suburb ?? a.neighbourhood ?? '';
    const direccion = [calle, barrio].filter(Boolean).join(', ') || data.display_name;

    input.value = direccion ?? '';  

} catch(err){
    if(err.name !== 'AbortError') console.error(err);
}

}

export function mostrarMapa() {
  if (typeof L === 'undefined') {
    console.error('Leaflet no está cargado en esta página');
    return;
  }
  setTimeout(() => {
    if (!mapa) crearMapa();
    else mapa.invalidateSize();
  }, 0);
}
