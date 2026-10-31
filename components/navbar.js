import { LINKS } from "./link-const.js";
import "../components/js/modalCitas.js"
import { contarCitasActivas, cancelarCita } from "../services/citas-service.js";
// window.guardarCita = guardarCita; 
window.cancelarCita = cancelarCita;

    const BASE_PATH =  new URL('../', import.meta.url);
    const abs = (path) => new URL(path,BASE_PATH)

export class Navbar extends HTMLElement {

    onCitasChange = () => this.updateBagde();


   async connectedCallback(){
    try{
     const res = await fetch(abs('components/navbar.html'))
     if(!res.ok)
        { throw new Error(`HTTP ${res.status}`)}
        this.innerHTML = await res.text();

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
    await this.updateBagde();
    this.escuchasCambios()
    
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
    console.log("Número de citas", total);
    bagdeCitas.classList.toggle('d-none', total=== 0);
    }


    disconnectedCallback() {
  window.removeEventListener("citas:changed", this.onCitasChange);
  window.removeEventListener("storage", this.onCitasChange);
}

    /**
     * MEtodop para escuchar cambios de la agenda de citas
     */
    escuchasCambios(){
        window.addEventListener("citas:changed", this.onCitasChange);
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
        let path = location.pathname;
        if(path.endsWith('/')) path += 'index.html';
        return path  === abs(href).pathname
    }

    render(){
       const ul  = this.querySelector('[data-nav-links]')
       ul.innerHTML = LINKS.map(({text,href})=>{
        const active = this.isActive(href);
        return `
        <li class="nav-item">
          <a class="nav-link nav-link-tt ${active ? 'active' : ''}"
             ${active ? 'aria-current="page"' : ''}
             href="${abs(href).href}">${text}</a>
        </li>`;
       }).join('')
        
    }
}
customElements.define('nav-bar', Navbar)