function showToast(message, type = 'success') {
    let container = document.getElementById('container-toast');
    if (!container) {
        container = document.createElement('div');
        container.id = 'container-toast';
        container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(container);
    }

    const styles = {
        success: { className: 'text-bg-success', icon: '✅' },
        error:   { className: 'text-bg-danger',  icon: '❌' }
    };
    const { className, icon } = styles[type] ?? styles.success;

    const toast = document.createElement('div');
    toast.className = `toast align-items-center border-0 ${className}`;
    toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body"></div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto"
                    data-bs-dismiss="toast" aria-label="Cerrar"></button>
        </div>`;
    toast.querySelector('.toast-body').textContent = `${icon} ${message}`;

    container.appendChild(toast);

    const instance = new bootstrap.Toast(toast, { delay: 4000 });
    toast.addEventListener('hidden.bs.toast', () => toast.remove());
    instance.show();
}