document.addEventListener('DOMContentLoaded', function () {
    const botonSiguiente = document.getElementById('boton-siguiente');

    if (botonSiguiente) {
        botonSiguiente.addEventListener('click', function () {
            // Redirige al Paso 2 del taller
            window.location.href = 'modal-content2.html';
        });
    }
});