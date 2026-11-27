import { BASE_URL } from "./config.js";
import { get } from "./http.js";

const BASE = "/users/me";
let userCache = null;
let peticionEnCurso = null;

export function getUsuarioActual(){
    if(userCache) return  Promise.resolve(userCache);
    if(!peticionEnCurso){
        peticionEnCurso = get(BASE)
        .then(u => {userCache = u; return u;})
        .finally(() => {peticionEnCurso= null});
    }

    return peticionEnCurso;
}

export function invalidarCache(){
    userCache = null;
}


