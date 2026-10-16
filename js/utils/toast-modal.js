export function showToast(message, type = 'success') {
    let container = document.getElementById('container-toast');
    if (!container) {
        container = document.createElement('div');
        container.id = 'container-toast';
        container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(container);
    }
    //estilos del toast 

    const styles = {
        success: { className: 'toast-success', icon: 'bi-send-check-fill',        title: '¡Mensaje enviado!' },
        error:   { className: 'toast-error',   icon: 'bi-exclamation-octagon-fill', title: 'Algo salió mal' }
    };
    const { className, icon, title } = styles[type] ?? styles.success;
    const delay = 4000;

    const toast = document.createElement('div');

    toast.className = `toast toast-tutaller ${className}`;
    toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
    toast.style.setProperty('--toast-delay', `${delay}ms`);

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
        
    toast.querySelector('.toast-title').textContent = title;
    toast.querySelector('.toast-text').textContent = message;

    container.appendChild(toast);

    const instance = new bootstrap.Toast(toast, { delay });
    toast.addEventListener('hidden.bs.toast', () => toast.remove());
    instance.show();
}