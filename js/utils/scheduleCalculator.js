// util para calcular hora de los horarios.
export function estaAbiertoElTaller(horaApertura, horaCierre, dias) {
    // Controla Argumentos.
    if (!horaApertura) throw new Error ('Ingrese la hora de apertura')
    if (!horaCierre) throw new Error ('Ingrese la hora de cierre')
    if (!dias) throw new Error ('Ingrese los dias')
        // Hora de cierre y apertura.
    //Actual
    const horaActual = new Date()
    
    // Apertura
    const [horasA, minutosA] = horaApertura.trim().split(":").map(Number);
    const apertura = new Date(new Date().setHours(horasA, minutosA, 0, 0));
    

    // Hora Cierre 
    const [horasC, minutosC] = horaCierre.split(":").map(Number);
    const cierre = new Date(new Date().setHours(horasC, minutosC, 0, 0));
    const horarioHabil = horaActual > apertura && horaActual < cierre ? true : false      
    
    // Dia habil para el taller
    const diasNormalizados = dias.map(dia => dia.toLowerCase() )
    const esDiaHabil = diasNormalizados.some(dia => dia === horaActual.toLocaleDateString('es-ES', { weekday: 'long' }))
    
    return horarioHabil && esDiaHabil
}


