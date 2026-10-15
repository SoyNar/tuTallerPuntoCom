document.getElementById('form-contacto').addEventListener('submit', async (e) => {
    e.preventDefault();
    const  form = e.target;
    const botton = form.querySelector('button[type="submit"]');
    botton.disabled = true;
    try{
        const response  = await fetch(form.action ,{
            method: 'POST',
            body: new FormData(form),
            headers:{ 'Accept': 'application/json'}
        }); 
        if (response.ok){
       showToast('¡Mensaje enviado! Te responderemos pronto.', 'success');
            form.reset();
        }else {
            showToast("hubo problema al enviar mensaje intenta en otro momento");
        }
    }catch {
        showToast("error de conextion");
    } finally{
        botton.disabled = false;
    }
})