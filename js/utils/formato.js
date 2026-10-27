// evita que un nombre con HTML se ejecute al pintarlo
export const escapar = (t) => {
  const d = document.createElement("div");
  d.textContent = t ?? "";
  return d.innerHTML;
};

// "cambio-aceite" -> "Cambio aceite"
export const legible = (valor) => {
  const texto = String(valor ?? "").replace(/-/g, " ");
  return texto.charAt(0).toUpperCase() + texto.slice(1);
};