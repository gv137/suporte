// URL do seu fluxo no Power Automate (ATUALIZE COM SUA URL)
const POWER_AUTOMATE_URL = "https://prod-126.westus.logic.azure.com:443/workflows/08d4654193974e15bdcb8a3c5a560b15/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun";

document.getElementById('form-chamado').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Elementos da interface
    const form = e.target;
    const botao = form.querySelector('button[type="submit"]');
    const mensagem = document.getElementById('mensagem');
    
    // Dados do formulário
    const chamado = {
        nome: document.getElementById('nome').value.trim(),
        local: document.getElementById('local').value.trim(),
        problema: document.getElementById('problema').value.trim()
    };

    // Validação
    if (!chamado.nome || !chamado.problema) {
        mostrarMensagem("⚠️ Preencha nome e problema!", 'erro');
        return;
    }

    // Configuração do envio
    botao.disabled = true;
    botao.textContent = "Enviando...";
    mensagem.style.display = 'none';

    try {
        // Envia para o Power Automate
        const response = await fetch(POWER_AUTOMATE_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(chamado)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `Erro HTTP: ${response.status}`);
        }

        mostrarMensagem("✅ Chamado registrado com sucesso!", 'sucesso');
        form.reset();

    } catch (error) {
        console.error("Erro no envio:", error);
        mostrarMensagem(`❌ Falha: ${error.message || "Servidor indisponível. Tente mais tarde."}`, 'erro');
        
        // Log adicional para debug (remova em produção)
        if (error.response) {
            console.log("Detalhes do erro:", await error.response.json());
        }
    } finally {
        botao.disabled = false;
        botao.textContent = "Enviar Chamado";
    }
});

// Exibe mensagens de status
function mostrarMensagem(texto, tipo) {
    const elemento = document.getElementById('mensagem');
    elemento.textContent = texto;
    elemento.className = `mensagem ${tipo}`;
    elemento.style.display = 'block';
    elemento.style.opacity = 1;
    
    setTimeout(() => {
        elemento.style.opacity = 0;
        setTimeout(() => elemento.style.display = 'none', 300);
    }, 5000);
}