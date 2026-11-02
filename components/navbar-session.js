
   import { obtenerUsuario, cerrarSesion, EVENTO_SESION } from "../../services/auth-service.js";

const iniciales = (usuario) => 
[usuario?.nombre, usuario?.apellido]
.filter(Boolean)
.map((p) => p.trim()[0])
.join("")
.toUpperCase();

function pintar(raiz){
    const usuario = obtenerUsuario();
    raiz.querySelector('[data-invitado]')?.classList.toggle("d-none",!!usuario);
    raiz.querySelector('[data-usuario]')?.classList.toggle('d-none',!usuario);
    raiz.querySelector('[data-agenda]')?.classList.toggle('d-none',!usuario);

    if(!usuario) return;
    const foto = raiz.querySelector('[data-usuario-foto]');
    const spanIniciales = raiz.querySelector('[data-usuario-iniciales]');

    if(usuario.foto){
        foto.src = usuario.foto;
        foto.classList.remove('d-none');
        spanIniciales.classList.add('d-none');
    }else{
        foto.classList.add('d-none');
        // spanIniciales.textContent = inciales(usuario);
        spanIniciales.textContent = iniciales(usuario);
        spanIniciales.classList.remove('d-none');
    }

    raiz.querySelector('[data-usuario-nombre]').textContent = [usuario.nombre, usuario.apellido].filter(Boolean).join(" ");
}

export function autenticar(raiz){
    const actualizar = () => pintar(raiz);
    const alCerrarSesion = () => cerrarSesion();
    const btnCerrar = raiz.querySelector('[data-cerrar-sesion]');

    actualizar();

    btnCerrar?.addEventListener('click', alCerrarSesion);
    window.addEventListener(EVENTO_SESION, actualizar);
    window.addEventListener('storage', actualizar);

    return () => {
        btnCerrar?.removeEventListener('click', alCerrarSesion);
        window.removeEventListener(EVENTO_SESION, actualizar);
        window.removeEventListener('storage', actualizar);
    }
}