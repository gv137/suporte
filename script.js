const API_URL = "https://script.google.com/macros/s/AKfycbwJiEl6SN6ghKo9EO2mTjwVyhGtBMbqClb72sR6-EtZRdj3NRR2edxYgvhe7uKhzG8B5Q/exec";

async function enviarChamado(chamado) {
  try {
    // Primeiro faz a requisição OPTIONS (pré-voo)
    await fetch(API_URL, {
      method: 'OPTIONS',
      mode: 'cors'
    });

    // Depois faz a requisição POST
    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chamado)
    });

    const result = await response.json();
    return result;
    
  } catch (error) {
    console.error("Erro ao enviar chamado:", error);
    return { success: false, error: error.message };
  }
}

document.getElementById('form-chamado').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const chamado = {
    id: Date.now(),
    nome: document.getElementById('nome').value,
    local: document.getElementById('local').value,
    problema: document.getElementById('problema').value
  };

  const resultado = await enviarChamado(chamado);
  
  if (resultado.success) {
    alert("Chamado enviado com sucesso!");
    document.getElementById('form-chamado').reset();
  } else {
    alert(`Erro: ${resultado.error || "Falha ao enviar chamado"}`);
  }
});