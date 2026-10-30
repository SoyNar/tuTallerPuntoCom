const CSS_URL = new URL("../../css/toast.css", import.meta.url).href;

function inyectarEstilos() {
  if (document.getElementById("tt-toast-estilos")) return;
  const link = document.createElement("link");
  link.id = "tt-toast-estilos";
  link.rel = "stylesheet";
  link.href = CSS_URL;
  document.head.appendChild(link);
}

// Se inyecta al cargar el módulo, así el CSS ya está listo cuando se muestre el primer toast
inyectarEstilos();

export function showToast(message, type = "success", titulo) {
  let container = document.getElementById("container-toast");
  if (!container) {
    container = document.createElement("div");
    container.id = "container-toast";
    container.className = "toast-container position-fixed bottom-0 end-0 p-3";
    document.body.appendChild(container);
  }

  // estilos del toast
  const styles = {
    success: { className: "toast-success", icon: "bi-check-circle-fill", title: "Listo" },
    error: { className: "toast-error", icon: "bi-exclamation-octagon-fill", title: "Algo salió mal" },
  };
  const { className, icon, title } = styles[type] ?? styles.success;
  const delay = 4000;

  const toast = document.createElement("div");
  toast.className = `toast toast-tutaller ${className}`;
  toast.setAttribute("role", type === "error" ? "alert" : "status");
  toast.style.setProperty("--toast-delay", `${delay}ms`);

  toast.innerHTML = `
    <div class="d-flex align-items-start gap-3 p-3">
      <span class="toast-icon"><i class="bi ${icon}"></i></span>
      <div class="flex-grow-1">
        <strong class="toast-title d-block"></strong>
        <span class="toast-text"></span>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Cerrar"></button>
    </div>
    <div class="toast-progress"></div>`;
  toast.querySelector(".toast-title").textContent = titulo ?? title;
  toast.querySelector(".toast-text").textContent = message;

  container.appendChild(toast);

  const instance = new bootstrap.Toast(toast, { delay });
  toast.addEventListener("hidden.bs.toast", () => toast.remove());
  instance.show();
}