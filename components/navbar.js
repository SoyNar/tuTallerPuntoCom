import { LINKS } from "./link-const.js";
import "../components/js/modalCitas.js"
import { contarCitasActivas } from "../services/citas-service.js";
import { autenticar } from "./navbar-session.js";



    const BASE_PATH =  new URL('../', import.meta.url);
    const abs = (path) => new URL(path,BASE_PATH)

export class Navbar extends HTMLElement {

    onCitasChange = () => this.updateBagde();


   async connectedCallback(){
    try{
      const url = abs("components/navbar.html").href;
  let html = sessionStorage.getItem("navbar-html");
  if (!html) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    html = await res.text();
    sessionStorage.setItem("navbar-html", html);
  }
  this.innerHTML = html;

        // inyectar modal agenda dinamicamente
        if(!document.querySelector('mis-citas-modal')){
            const modalComponent = document.createElement('mis-citas-modal');
            this.appendChild(modalComponent);
        }
      

    } catch (err){
        console.error("No se pudo cargar la navbar", err);
        return;

    }
    this.resolvePaths();
    this.render()
    this.cerrarMenuAlNavegar();
    this.detenerSesion = autenticar(this);
    await this.updateBagde();
    this.escuchasCambios()
    
    }

    cerrarMenuAlNavegar() {
  if (this.menuListener) return;

  this.menuListener = (e) => {
    if(!e.target.closest(".nav-link")) return;
    const panel = this.querySelector("#navPrincipal");
   window.bootstrap?.Collapse.getInstance(panel)?.hide();

  };
    this.addEventListener("click", this.menuListener);
}

    /**
     * Metodo que actualiza el bagde de la navbar (Boton de citas agendadas)
     * @returns 
     */
     async updateBagde()
    {
     const bagdeCitas = this.querySelector('[data-badge-citas]');   
     const bagdeNumero = this.querySelector('[data-badge-numero]');
    if(!bagdeCitas || !bagdeNumero ) return; 
    const total = await contarCitasActivas();
    bagdeNumero.textContent = total;
    // console.log("Número de citas", total);
    bagdeCitas.classList.toggle('d-none', total=== 0);
    }


    disconnectedCallback() {
        this.detenerSesion?.();
  window.removeEventListener("citas:modificadas", this.onCitasChange);
  window.removeEventListener("storage", this.onCitasChange);
}

    /**
     * MEtodop para escuchar cambios de la agenda de citas
     */
    escuchasCambios(){
        window.addEventListener("citas:modificadas", this.onCitasChange);
        window.addEventListener("storage", this.onCitasChange)
    }

  

    resolvePaths(){
        this.querySelectorAll('[data-href]').forEach( el => {
            el.href = abs(el.dataset.href).href;
        })
        this.querySelectorAll('[data-src]').forEach(el => {
            el.src = abs(el.dataset.src).href
        })
    }

    isActive(href){
      const limpia = p => p.replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '');
     return limpia(location.pathname) === limpia(abs(href).pathname);
    }

 render() {
       const ul = this.querySelector('[data-nav-links]');
       if (!ul) return;
       ul.innerHTML = LINKS.map(({ text, href, rol }) => {
        const active = this.isActive(href);
        return `
        <li class="nav-item ${rol ? 'd-none' : ''}" ${rol ? `data-requiere-sesion data-rol="${rol}"` : ''}>
          <a class="nav-link nav-link-tt ${active ? 'active' : ''}"
             ${active ? 'aria-current="page"' : ''}
             href="${abs(href).href}">${text}</a>
        </li>`;
       }).join('');
    }
}
customElements.define('nav-bar', Navbar)