const API_URL = "https://script.google.com/macros/s/AKfycby19EJ8eNSUiiLBZO3444GOkDiV9Akl8-iynMAaaFgB3FTlxR0e6bbV8K1e_Ap_lfjizw/exec";

async function sendToGoogleAppsScript(data) {
  try {
    // Primeiro faz a requisição OPTIONS (pré-voo)
    await fetch(API_URL, { method: 'OPTIONS' });
    
    // Depois faz a requisição POST com os dados
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    return await response.json();
  } catch (error) {
    console.error("Erro na comunicação:", error);
    return { success: false, error: "Falha na conexão" };
  }
}

document.getElementById('form-chamado').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const chamado = {
    id: Date.now(),
    nome: document.getElementById('nome').value.trim(),
    local: document.getElementById('local').value.trim(),
    problema: document.getElementById('problema').value.trim()
  };

  const resultado = await sendToGoogleAppsScript(chamado);
  
  if (resultado.success) {
    alert("✅ Chamado enviado com sucesso!");
    e.target.reset();
  } else {
    alert(`❌ Erro: ${resultado.error || "Falha ao enviar chamado"}`);
  }
});