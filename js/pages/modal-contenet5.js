document.addEventListener('DOMContentLoaded', function () {
    const botonAtras = document.getElementById('boton-atras');
    const btnConfirmarPublicacion = document.getElementById('btn-confirmar-publicacion');

    if (botonAtras) {
        botonAtras.addEventListener('click', function () {
            // Regresa al Paso 5 de forma correcta
            window.location.href = 'modal-content5.html';
        });
    }

    if (btnConfirmarPublicacion) {
        btnConfirmarPublicacion.addEventListener('click', function () {
            // Mantiene la alerta de éxito solicitada
            alert('¡Taller publicado exitosamente!');
            // Redirige al panel administrativo
            window.location.href = '../admin.html'; 
        });
    }
});