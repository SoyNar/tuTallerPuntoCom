let modalEl = null;

/**
 * Crea el contenedor del modal de confirmación (una sola vez).
 */
function crearModal() {
  modalEl = document.createElement("div");
  modalEl.className = "modal fade";
  modalEl.tabIndex = -1;
  modalEl.setAttribute("aria-labelledby", "confirmarTitulo");
  modalEl.setAttribute("aria-hidden", "true");
  modalEl.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content rounded-4">
        <div class="modal-header border-0 pb-0">
          <h5 class="modal-title fw-bold" id="confirmarTitulo"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body" data-confirmar="cuerpo"></div>
        <div class="modal-footer border-0 pt-0">
          <button type="button" class="btn btn-outline-secondary" data-confirmar="cancelar" data-bs-dismiss="modal"></button>
          <button type="button" class="btn" data-confirmar="aceptar"></button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modalEl);
}

/**
 * Pinta el cuerpo: un párrafo opcional, una lista de detalles
 * (etiqueta | valor) y un total destacado al final.
 */
function pintarCuerpo(cuerpo, { mensaje, detalles = [], total }) {
  cuerpo.replaceChildren();

  if (mensaje) {
    const p = document.createElement("p");
    p.className = "text-body-secondary mb-3";
    p.textContent = mensaje;
    cuerpo.append(p);
  }

  if (detalles.length) {
    const lista = document.createElement("ul");
    lista.className = "list-group list-group-flush border rounded-3 overflow-hidden mb-3";

    for (const { etiqueta, valor } of detalles) {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-start gap-3";

      const et = document.createElement("span");
      et.className = "text-body-secondary small";
      et.textContent = etiqueta;

      const va = document.createElement("span");
      va.className = "fw-semibold text-end";
      va.textContent = valor;

      li.append(et, va);
      lista.append(li);
    }
    cuerpo.append(lista);
  }

  if (total) {
    const caja = document.createElement("div");
    caja.className = "d-flex justify-content-between align-items-center rounded-3 bg-success-subtle text-success-emphasis p-3";

    const et = document.createElement("span");
    et.textContent = total.etiqueta;

    const va = document.createElement("strong");
    va.className = "fs-5";
    va.textContent = total.valor;

    caja.append(et, va);
    cuerpo.append(caja);
  }
}

/**
 * Modal de confirmación reutilizable.
 * Devuelve una promesa que resuelve true (aceptar) o false (cancelar/cerrar).
 */
export function confirmar({
  titulo = "Confirmar",
  mensaje,
  detalles,
  total,
  textoAceptar = "Aceptar",
  textoCancelar = "Cancelar",
  variante = "primary", // primary | danger | warning | success ...
} = {}) {
  if (!modalEl) crearModal();

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  const btnAceptar = modalEl.querySelector('[data-confirmar="aceptar"]');
  const btnCancelar = modalEl.querySelector('[data-confirmar="cancelar"]');

  modalEl.querySelector("#confirmarTitulo").textContent = titulo;
  pintarCuerpo(modalEl.querySelector('[data-confirmar="cuerpo"]'), {
    mensaje,
    detalles,
    total,
  });
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
        document.activeElement?.blur();
        modal.hide();
      },
      { signal: ac.signal },
    );

    modalEl.addEventListener(
      "hidden.bs.modal",
      () => {
        document.activeElement?.blur();
        ac.abort();
        resolve(aceptado);
      },
      { once: true },
    );

    modal.show();
  });
}