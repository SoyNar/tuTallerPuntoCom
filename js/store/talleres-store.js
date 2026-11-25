
let talleres = null;
let pendiente = null;


/**
 * Devuelve lista de talleres 
 * hace una sola petición aunque se llame varias veces al tiempo
 * @param {{forzar?: boolean}} 
 */

export  function cargarTalleres({forzar = false} = {})
{
    if(talleres && !forzar){
        return Promise.resolve(talleres);
    }

    if(!pendiente){
        pendiente = get("/workshops")
        .then(data => {
            talleres = data;
            return data;
        }).finally(() => {
            pendiente =  null;
        })
    }

    return pendiente;
}

export async function obternerTallerPoId(id){
    const lista = await cargarTalleres();
    return lista.find(t => t.id === Number((id) ?? null));
}
/***
 * Este metodo sirve para borrar datos en memoria de talleres
 * invalidar el caché
 */
export function invalidarTalleres(){
    talleres = null;
}

