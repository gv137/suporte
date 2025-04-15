// URL completa do seu fluxo (copie exatamente como está no Power Automate)
const FLOW_URL = "https://prod-126.westus.logic.azure.com:443/workflows/08d4654193974e15bdcb8a3c5a560b15/triggers/manual/paths/invoke?api-version=2016-06-01";

document.getElementById('form-chamado').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Elementos da interface
  const botao = e.target.querySelector('button');
  const mensagem = document.getElementById('mensagem');
  
  // Dados do formulário
  const dados = {
    nome: document.getElementById('nome').value.trim(),
    local: document.getElementById('local').value.trim(),
    problema: document.getElementById('problema').value.trim()
  };

  // Validação
  if (!dados.nome || !dados.problema) {
    mensagem.textContent = "⚠️ Preencha nome e problema!";
    mensagem.style.color = "red";
    return;
  }

  // Envio
  botao.disabled = true;
  botao.textContent = "Enviando...";

  try {
    const resposta = await fetch(FLOW_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    if (resposta.ok) {
      mensagem.textContent = "✅ Chamado enviado!";
      mensagem.style.color = "green";
      e.target.reset();
    } else {
      throw new Error("Erro ao enviar");
    }
  } catch (erro) {
    mensagem.textContent = "❌ Erro, tente novamente";
    mensagem.style.color = "red";
    console.error(erro);
  } finally {
    botao.disabled = false;
    botao.textContent = "Enviar Chamado";
  }
});