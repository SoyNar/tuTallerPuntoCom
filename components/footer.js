class TuFooter extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <footer class="pie-pagina bg-azul-oscuro pt-5 pb-3 text-secondary">
                <div class="container-fluid px-4 px-lg-5">
                    <div class="row gy-4 mb-4">
                        <div class="col-12 col-lg-4 mb-3 mb-lg-0">
                            <div class="d-flex align-items-center mb-3">
                                <img src="../assets/icons/chispa-mascota 3.svg" alt="chispa">
                                <img src="../assets/icons/letra-logo.png" alt="Logo TuTaller" class="me-2 logo-imagen">
                            </div>
                            <p class="pe-lg-5 mb-0  small lh-base">
                                Consulta talleres, cotiza servicios y agenda tus citas de forma fácil y organizada.
                            </p>
                        </div>
                        <div class="col-6 col-md-4 col-lg-2">
                            <h5 class="text-white fs-6 fw-bold mb-3">Navegación</h5>
                            <ul class="list-unstyled d-flex flex-column gap-2 mb-0">
                                <li><a href="../index.html" class="enlace-footer small link-secondary text-decoration-none">Inicio</a></li>
                                <li><a href="about.html" class="enlace-footer small link-secondary text-decoration-none">Sobre nosotros</a></li>
                                <li><a href="#" class="enlace-footer small link-secondary text-decoration-none">Catálogo</a></li>
                                <li><a href="contact.html" class="enlace-footer small link-secondary text-decoration-none">Contáctanos</a></li>
                            </ul>
                        </div>
                        <div class="col-6 col-md-4 col-lg-2">
                            <h5 class="text-white fs-6 fw-bold mb-3">Mi cuenta</h5>
                            <ul class="list-unstyled d-flex flex-column gap-2 mb-0">
                                <li><a href="#" class="enlace-footer small link-secondary text-decoration-none">Iniciar sesión</a></li>
                                <li><a href="#" class="enlace-footer small link-secondary text-decoration-none">Registrarme</a></li>
                                <li><a href="#" class="enlace-footer small link-secondary text-decoration-none">Cotizar</a></li>
                                <li><a href="#" class="enlace-footer small link-secondary text-decoration-none">Agendar cita</a></li>
                            </ul>
                        </div>
                        <div class="col-12 col-md-4 col-lg-4">
                            <h5 class="text-white fs-6 fw-bold mb-3">Contacto</h5>
                            <ul class="list-unstyled d-flex flex-column gap-2 mb-0">
                                <li><a href="mailto:contacto@tutaller.com" class="enlace-footer small link-secondary text-decoration-none">contacto@tutaller.com</a></li>
                                <li><a href="tel:+573000000000" class="enlace-footer small link-secondary text-decoration-none">+57 300 000 0000</a></li>
                                <li class="small ">Lun a sáb, 8 am a 6 pm</li>
                            </ul>
                        </div>
                    </div>
                    <hr class="linea-divisora my-4">
                    <div class="row">
                        <div class="col-12 text-center text-md-start">
                            <p class="mb-0 small">
                                &copy; 2026 TuTaller &middot; Proyecto integrador &middot; Equipo 7
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('tu-footer', TuFooter);