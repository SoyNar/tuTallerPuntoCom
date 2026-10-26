import { obtenerTalleres } from "../../services/talleres-service.js";

// Color de la etiqueta segun el estado ingresado
const ESTADOS = {
  activo: { texto: "Activo", clase: "bg-success text-success" },
  pendiente: { texto: "Pendiente", clase: "bg-warning text-warning-emphasis" },
  suspendido: { texto: "Suspendido", clase: "bg-danger text-danger" },
};

// Limpia los valores de servicios ("cambio-aceite" -> "Cambio aceite)
const legible = (valor) => {
  const texto = String(valor ?? "").replace(/-/g, " ");
  return texto.charAt(0).toUpperCase() + texto.slice(1);
};

// Elimin minusculas y tildes para mejorar la busqueda
const normalizar = (t) =>
  String(t ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

// Captura de elementos (buscador, filtro de estados y la tabla)
const tbody = document.getElementById("filas-tabla");
const buscador = document.getElementById("buscar-taller");
const filtroEstado = document.getElementById("filtro-estado");

// Funcion para mostrar las filas de la tabla con los datos de los talleres
function filaHTML(t) {
  const estado = ESTADOS[t.estado] ?? ESTADOS.pendiente;
  const servicios = (t.servicios ?? []).map(legible).join(", ");

  return `
    <tr>
      <td class="py-3">
        <div class="d-flex align-items-center">
          <div class="bg-table-img rounded p-3 me-3 d-flex align-items-center justify-content-center flex-shrink-0"
               style="width: 48px; height: 48px;">
            <i class="bi bi-wrench text-secondary fs-5"></i>
          </div>
          <div>
            <h6 class="mb-0 fw-bold">${t.nombre}</h6>
            <small class="text-muted">NIT ${t.nit}</small>
          </div>
        </div>
      </td>
      <td class="text-secondary">${t.direccion}, ${legible(t.ciudad)}</td>
      <td class="text-secondary">${legible(t.tipo)}</td>
      <td class="text-secondary">${servicios}</td>
      <td>
        <span class="badge ${estado.clase} bg-opacity-25 rounded-pill px-3 py-2 fw-medium">${estado.texto}</span>
      </td>
      <td class="text-end"><a href="#" class="text-decoration-none fw-medium">Editar</a></td>
    </tr>`;
}

// Buscador (nombre, NIT, dirección, ciudad) + filtro de estado
function filtrar(lista) {
  const texto = normalizar(buscador.value.trim());
  const estado = filtroEstado.value;

  return lista.filter((t) => {
    const contenido = normalizar(
      `${t.nombre} ${t.nit} ${t.direccion} ${t.ciudad}`,
    );
    return (
      (!texto || contenido.includes(texto)) && (!estado || t.estado === estado)
    );
  });
}

// obtiene los talleres y los pasa por la funcion de filtrar y si esta vacio muestra un mensaje
function renderizarTabla() {
  const lista = filtrar(obtenerTalleres());

  tbody.innerHTML = lista.length
    ? lista.map(filaHTML).join("")
    : `<tr><td colspan="6" class="text-center text-secondary py-5">
         No hay talleres para mostrar.
       </td></tr>`;
}

// Eventos
buscador.addEventListener("input", renderizarTabla);
filtroEstado.addEventListener("change", renderizarTabla);
document.addEventListener("taller:guardado", renderizarTabla);

renderizarTabla();
console.log(JSON.stringify(obtenerTalleres(), null, 2));
