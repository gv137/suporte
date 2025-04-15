// URL do seu fluxo no Power Automate (SUBSTITUA pela sua URL real)
const POWER_AUTOMATE_URL = "https://prod-126.westus.logic.azure.com:443/workflows/08d4654193974e15bdcb8a3c5a560b15/triggers/manual/paths/invoke?api-version=2016-06-01";

document.getElementById('form-chamado').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Elementos da interface
    const form = e.target;
    const mensagem = document.getElementById('mensagem');
    const botao = form.querySelector('button[type="submit"]');
    
    // Coleta os dados
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

    // Desativa o botão durante o envio
    botao.disabled = true;
    botao.textContent = "Enviando...";

    try {
        const response = await fetch(POWER_AUTOMATE_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(chamado)
        });

        if (!response.ok) throw new Error(`Erro ${response.status}`);
        
        mostrarMensagem("✅ Chamado registrado com sucesso!", 'sucesso');
        form.reset();

    } catch (error) {
        console.error("Erro:", error);
        mostrarMensagem(`❌ Falha no envio: ${error.message || "Tente novamente mais tarde"}`, 'erro');
    } finally {
        botao.disabled = false;
        botao.textContent = "Enviar Chamado";
    }
});

// Mostra mensagens na interface
function mostrarMensagem(texto, tipo) {
    const elemento = document.getElementById('mensagem');
    elemento.textContent = texto;
    elemento.className = `mensagem ${tipo}`;
    setTimeout(() => elemento.style.opacity = 1, 10);
    
    // Some após 5 segundos
    setTimeout(() => {
        elemento.style.opacity = 0;
        setTimeout(() => elemento.className = 'mensagem', 300);
    }, 5000);
}