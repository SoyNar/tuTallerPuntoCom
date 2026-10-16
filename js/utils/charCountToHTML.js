export function contarCaracteresHTML(elemento, textarea, maxCaracteres) {


    if (!elemento || !textarea) return;

    const restantes = maxCaracteres - textarea.value.length
    elemento.textContent = String(restantes);
}