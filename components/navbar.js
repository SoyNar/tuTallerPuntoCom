import { LINKS } from "./link-const.js";
import "../components/js/modalCitas.js"

    const BASE_PATH =  new URL('../', import.meta.url);
    const abs = (path) => new URL(path,BASE_PATH)

export class Navbar extends HTMLElement {


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
    }

    updateBagde()
    {
         

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