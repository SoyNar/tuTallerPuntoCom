import { obtenerTalleres, mostrarListaEnConsola } from "../../services/talleres-service.js";
import { escapeHTML } from "../utils/escapeHTML.js";
import { TIPOS, CIUDADES, SERVICIOS, ESTADOS } from "../data/catalogos.js";

/**
 * admin.js: pinta la tabla y las estadísticas de la vista de administrador
 * a partir de la lista de talleres guardada (services/talleres-service.js).
 * Se vuelve a pintar al cargar, al guardar un taller y al usar los filtros.
 */

const tbody = document.getElementById('filas-tabla');
const buscador = document.getElementById('buscar-taller');
const filtroEstado = document.getElementById('filtro-estado');

function filaHTML(t) {
  const estado = ESTADOS[t.estado] ?? ESTADOS.pendiente;
  const servicios = (t.servicios ?? []).map((s) => SERVICIOS[s] ?? s).join(', ');

  return `
    <tr>
      <td class="py-3">
        <div class="d-flex align-items-center">
          <div class="bg-table-img rounded p-3 me-3 d-flex align-items-center justify-content-center flex-shrink-0"
               style="width: 48px; height: 48px;">
            <i class="bi bi-wrench text-secondary fs-5"></i>
          </div>
          <div>
            <h6 class="mb-0 fw-bold">${escapeHTML(t.nombre)}</h6>
            <small class="text-muted">NIT ${escapeHTML(t.nit)}</small>
          </div>
        </div>
      </td>
      <td class="text-secondary">${escapeHTML(t.direccion)}, ${escapeHTML(CIUDADES[t.ciudad] ?? t.ciudad)}</td>
      <td class="text-secondary">${escapeHTML(TIPOS[t.tipo] ?? t.tipo)}</td>
      <td class="text-secondary">${escapeHTML(servicios)}</td>
      <td>
        <span class="badge ${estado.clase} bg-opacity-25 rounded-pill px-3 py-2 fw-medium">${estado.texto}</span>
      </td>
      <td class="text-end"><a href="#" class="text-decoration-none fw-medium">Editar</a></td>
    </tr>`;
}

function filtrar(lista) {
  const texto = buscador.value.trim().toLowerCase();
  const estado = filtroEstado.value;

  return lista.filter((t) => {
    const coincideTexto = !texto ||
      `${t.nombre} ${t.direccion} ${CIUDADES[t.ciudad] ?? ''}`.toLowerCase().includes(texto);
    return coincideTexto && (!estado || t.estado === estado);
  });
}

function renderizarTabla() {
  const lista = filtrar(obtenerTalleres());

  tbody.innerHTML = lista.length
    ? lista.map(filaHTML).join('')
    : `<tr><td colspan="6" class="text-center text-secondary py-5">
         Aún no hay talleres para mostrar. Usa <strong>+ Agregar taller</strong> para crear el primero.
       </td></tr>`;
}

function renderizarEstadisticas() {
  const lista = obtenerTalleres();
  const contar = (estado) => lista.filter((t) => t.estado === estado).length;

  document.getElementById('stat-activos').textContent = contar('activo');
  document.getElementById('stat-pendientes').textContent = contar('pendiente');
  document.getElementById('stat-suspendidos').textContent = contar('suspendido');
  document.getElementById('stat-total').textContent = lista.length;
}

function actualizarVista() {
  renderizarTabla();
  renderizarEstadisticas();
}

buscador.addEventListener('input', renderizarTabla);
filtroEstado.addEventListener('change', renderizarTabla);
document.addEventListener('taller:guardado', actualizarVista);

actualizarVista();
mostrarListaEnConsola();
