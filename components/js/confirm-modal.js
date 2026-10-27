let modalEl = null;

/**
 * Esta función permite crear un modal de confirmacion reusable
 * crea el html
 */

function crearModal() {
  modalEl = document.createElement("div");
  modalEl.className = "modal fade";
  modalEl.tabIndex = -1;
  modalEl.setAttribute("aria-labelledby", "confirmarTitulo");
  modalEl.setAttribute("aria-hidden", "true");
  modalEl.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title" id="confirmarTitulo"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body" data-confirmar="mensaje"></div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-outline-secondary" data-confirmar="cancelar" data-bs-dismiss="modal"></button>
          <button type="button" class="btn" data-confirmar="aceptar"></button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modalEl);
}

/**
 * funcion para reusar cuando se necesita confirmar 
 * eliminar, o cualquier otro mensaje de confirmación
 */

export function confirmar({
  titulo = "Confirmar",
  mensaje = "¿Estás seguro?",
  textoAceptar = "Aceptar",
  textoCancelar = "Cancelar",
  variante = "primary", // primary | danger | warning | success ...
} = {}) {
  if (!modalEl) crearModal();

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  const btnAceptar = modalEl.querySelector('[data-confirmar="aceptar"]');
  const btnCancelar = modalEl.querySelector('[data-confirmar="cancelar"]');

  modalEl.querySelector("#confirmarTitulo").textContent = titulo;
  modalEl.querySelector('[data-confirmar="mensaje"]').textContent = mensaje;
  btnAceptar.textContent = textoAceptar;
  btnCancelar.textContent = textoCancelar;
  btnAceptar.className = `btn btn-${variante}`;

  return new Promise((resolve) => {
    let aceptado = false;
    const ac = new AbortController();

    btnAceptar.addEventListener(
      "click",
      () => {
        aceptado = true;
        modal.hide();
      },
      { signal: ac.signal },
    );
    modalEl.addEventListener(
      "hidden.bs.modal",
      () => {
        ac.abort(); 
        resolve(aceptado);
      },
      { once: true },
    );

    modal.show();
  });
}

/**
 * metodo para confirmar eliminacion
 * @param {*} nombre 
 * @returns 
 */
export const confirmarEliminar = (nombre = "este elemento") =>
  confirmar({
    titulo: "Eliminar",
    mensaje: `¿Eliminar ${nombre}? Esta acción no se puede deshacer.`,
    textoAceptar: "Eliminar",
    variante: "danger",
  });