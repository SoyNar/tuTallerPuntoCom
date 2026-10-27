export function crearPaginador({ porPagina = 5, contenedor, info, alCambiar, flechas = true }) {
  let pagina = 1;
  let total = 0;

  const totalPaginas = () => Math.max(1, Math.ceil(total / porPagina));

  function pintarBotones() {
    const n = totalPaginas();
    if (n <= 1) {
      contenedor.innerHTML = "";
      return;
    }

    const item = (texto, destino, { activo = false, off = false } = {}) => `
      <li class="page-item ${activo ? "active" : ""} ${off ? "disabled" : ""}">
        <a class="page-link" href="#" data-pagina="${destino}">${texto}</a>
      </li>`;

   let html = flechas ? item("&laquo;", pagina - 1, { off: pagina === 1 }) : "";
for (let i = 1; i <= n; i++) html += item(i, i, { activo: i === pagina });
if (flechas) html += item("&raquo;", pagina + 1, { off: pagina === n });
contenedor.innerHTML = html;
  }

  contenedor.addEventListener("click", (e) => {
    e.preventDefault();
    const enlace = e.target.closest("[data-pagina]");
    if (!enlace || enlace.parentElement.classList.contains("disabled")) return;
    pagina = Number(enlace.dataset.pagina);
    alCambiar();
  });

  return {
    paginar(lista) {
      total = lista.length;
      if (pagina > totalPaginas()) pagina = totalPaginas();

      const inicio = (pagina - 1) * porPagina;
      const items = lista.slice(inicio, inicio + porPagina);

      if (info) {
        info.textContent = total
          ? `Mostrando ${inicio + 1}-${inicio + items.length} de ${total}`
          : "";
      }
      pintarBotones();
      return items;
    },
    reiniciar() {
      pagina = 1;
    },
  };
}