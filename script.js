const API_URL = "https://script.google.com/macros/s/AKfycbxTvtoOHNRL8kr2vtqG_XPyb0CbkGBXTSrpbmlWT45eZp1ql3wvYGV8rvkyewKfkKd92w/exec"; // Substitua pela URL do seu Apps Script!

document.getElementById('form-chamado').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const chamado = {
        id: Date.now(),
        nome: document.getElementById('nome').value,
        local: document.getElementById('local').value,
        problema: document.getElementById('problema').value
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(chamado)
        });
        const result = await response.json();
        alert(result.success ? "Chamado enviado!" : `Erro: ${result.error}`);
        document.getElementById('form-chamado').reset();
    } catch (error) {
        alert("Erro ao enviar. Tente novamente.");
        console.error(error);
    }
});