/**
 * Conecta los botones "Agendar" de un contenedor de tarjetas con el modal de cita.
 * Se usa en el home y en el catálogo, así la lógica vive en un solo lugar.
 *
 * @param {HTMLElement} contenedor     elemento donde se pintan las tarjetas
 * @param {() => object[]} obtenerTalleres  devuelve la lista de talleres que hay en pantalla
 */
export function activarBotonesAgendar(contenedor, obtenerTalleres) {
  contenedor.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-agendar");
    if (!btn) return;

    const taller = obtenerTalleres().find(
      (t) => String(t.id) === btn.dataset.tallerId,
    );
    if (!taller) return;

    const modal = document.querySelector("agendar-cita-modal");
    if (!modal?.abrir) {
      console.error("Falta <agendar-cita-modal> o su script en esta página");
      return;
    }
    modal.abrir(taller);
  });
}
