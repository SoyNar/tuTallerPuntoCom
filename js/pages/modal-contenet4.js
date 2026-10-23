document.addEventListener('DOMContentLoaded', function () {
    const botonAtras = document.getElementById('boton-atras');
    const botonSiguiente = document.getElementById('boton-siguiente');

    if (botonAtras) {
        botonAtras.addEventListener('click', function (e) {
            e.preventDefault();
            // Se devuelve al Paso 3
            window.location.href = 'modal-content3.html';
        });
    }

    if (botonSiguiente) {
        botonSiguiente.addEventListener('click', function (e) {
            e.preventDefault();
            // Avanza al Paso 5
            window.location.href = 'modal-content5.html';
        });
    }
});