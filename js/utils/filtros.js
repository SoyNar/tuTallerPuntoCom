const escapar = (t) => {
  const d = document.createElement("div");
  d.textContent = t ?? "";
  return d.innerHTML;
};

export const normalizar = (t) =>
  String(t ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/**
 * Engancha los filtros de un contenedor. Cada campo se marca con data-filtro="clave".
 * modo "vivo": avisa al escribir o cambiar. modo "boton": avisa al pulsar
 * el botón con data-filtro-buscar o al dar Enter.
 */
export function crearFiltros({ contenedor, alCambiar, modo = "vivo" }) {
  const campos = () => [...contenedor.querySelectorAll("[data-filtro]")];
  const valores = () =>
    Object.fromEntries(campos().map((c) => [c.dataset.filtro, c.value.trim()]));

  if (modo === "vivo") {
    contenedor.addEventListener("input", (e) => {
      if (e.target.matches("[data-filtro]")) alCambiar(valores());
    });
  } else {
    contenedor.addEventListener("click", (e) => {
      if (e.target.closest("[data-filtro-buscar]")) alCambiar(valores());
    });
    contenedor.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.matches("input[data-filtro]")) {
        alCambiar(valores());
      }
    });
  }

  return {
    valores,
    limpiar() {
      campos().forEach((c) => (c.value = ""));
      alCambiar(valores());
    },
  };
}

export function llenarSelect(select, opciones, textoVacio = "Todos") {
  const actual = select.value;
  select.innerHTML =
    `<option value="">${escapar(textoVacio)}</option>` +
    opciones
      .map((o) => {
        const { valor, texto } = typeof o === "string" ? { valor: o, texto: o } : o;
        return `<option value="${escapar(valor)}">${escapar(texto)}</option>`;
      })
      .join("");
  if ([...select.options].some((o) => o.value === actual)) select.value = actual;
}

export function filtrarLista(lista, valores, reglas) {
  return lista.filter((item) =>
    Object.entries(reglas).every(
      ([clave, regla]) => !valores[clave] || regla(item, valores[clave]),
    ),
  );
}