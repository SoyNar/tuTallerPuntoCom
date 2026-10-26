// util para calcular hora de los horarios.
export function estaAbiertoElTaller(horaApertura, horaCierre, dias) {
    // Controla Argumentos.
    if (!horaApertura) return 'Ingrese la hora de apertura'
    if (!horaCierre) return 'Ingrese la hora de cierre'
    if (!dias) return 'Ingrese los dias'

    // Hora de cierre y apertura.
        //Actual
    const horaActual = new Date()
    
        // Apertura
    let [horas, minutos] = horaApertura.split(":").map(Number);
    const apertura = new Date(new Date().setHours(horas, minutos));
    
    // Hora Cierre 
    [horas, minutos] = horaCierre.split(":").map(Number);
    const cierre = new Date(new Date().setHours(horas, minutos, 0, 0));

    const estaAbierto = horaActual > apertura && horaActual < cierre ? true : false      
    
    // Dia habil para el taller
    const esDiaHabil = dias.some(dia => dia === horaActual.toLocaleDateString('es-ES', { weekday: 'long' }))

    return estaAbierto && esDiaHabil
}


