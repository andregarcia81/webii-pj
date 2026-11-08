function isAtivo(cli) {
  return cli && cli.cli_ativoinativo === 'A';
}

async function executar(url, alvo) {
  try {
    const res = await fetch(url);
    const dados = await res.json();

    if (Array.isArray(dados)) {
      let tabela = `<table><tr><th>Código</th><th>Tipo</th><th>Nome</th><th>Email</th><th>Cidade</th><th>UF</th><th>Status</th></tr>`;
      dados.forEach(cli => {
        tabela += `<tr>
          <td>${cli.cli_codigo}</td>
          <td>${cli.cli_tipo}</td>
          <td>${cli.cli_nome}</td>
          <td>${cli.cli_email}</td>
          <td>${cli.cli_cidade}</td>
          <td>${cli.cli_estado}</td>
          <td>${cli.cli_ativoinativo === 'A' ? '✅ Ativo' : '⏸️ Inativo'}</td>
        </tr>`;
      });
      tabela += "</table>";
      document.getElementById(alvo).innerHTML = tabela;
    } else if (dados?.cli_codigo) {
      const ativo = isAtivo(dados);
      document.getElementById(alvo).innerHTML = `
        <p style="color:green">✅ Encontrado!</p>
        <div class="dados-cliente">
          <p><strong>Código:</strong> ${dados.cli_codigo}</p>
          <p><strong>Nome:</strong> ${dados.cli_nome}</p>
          <p><strong>Status:</strong> ${ativo ? '✅ Ativo' : '⏸️ Inativo'}</p>
        </div>`;
    }
  } catch (e) {
    console.error(e);
  }
}

// ✅ FUNÇÃO CORRIGIDA com o caminho /ai/ na rota
async function acaoAtivoInativo() {
  const campoCodigo = document.querySelector('input[name="cli_codigo"]');
  if (!campoCodigo) {
    alert("Campo de código não encontrado!");
    return;
  }
  
  const codigo = campoCodigo.value.trim();
  const alvo = "resultado-findAll";

  console.log("🔘 Código digitado:", codigo);

  if (!codigo) {
    alert("Digite o código do cliente primeiro!");
    return;
  }

  try {
    // ✅ Rota CORRIGIDA para combinar com o seu: /ai/:id
    const resposta = await fetch(`/cadclient/ai/${codigo}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" }
    });

    const dados = await resposta.json();
    console.log("📥 Resposta recebida:", dados);

    if (!resposta.ok || dados.erro) {
      throw new Error(dados.mensagem || "Não foi possível alterar o status");
    }

    const ativo = isAtivo(dados);
    const statusTexto = ativo ? "ativado" : "inativado";

    document.getElementById(alvo).innerHTML = `
      <p style="color:green; font-weight:bold">✅ Cliente ${statusTexto} com sucesso!</p>
      <div class="dados-cliente">
        <p><strong>Código:</strong> ${dados.cli_codigo}</p>
        <p><strong>Nome:</strong> ${dados.cli_nome}</p>
        <p><strong>Novo Status:</strong> ${ativo ? '✅ Ativo' : '⏸️ Inativo'}</p>
      </div>
      <p style="color:green">✔️ O status foi alterado no sistema.</p>
    `;

    executar("/cadclient", alvo);

  } catch (erro) {
    console.error("❌ Erro:", erro);
    document.getElementById(alvo).innerHTML = `
      <p style="color:red; font-weight:bold">❌ Erro</p>
      <p style="color:red">${erro.message}</p>
    `;
  }
}

async function enviarForm(form, url, alvo, metodo = 'POST') {
  try {
    const obj = Object.fromEntries(new FormData(form));
    console.log("📤 Enviando formulário:", obj);

    const res = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    });

    const dados = await res.json();
    console.log("📥 Resposta recebida:", dados);

    if (!res.ok || dados.erro) throw new Error(dados.mensagem || "Erro");

    const ativo = isAtivo(dados);
    let msg = '';

    switch (metodo) {
      case 'POST':
        msg = `
          <p style="color:green; font-weight:bold">✅ Cadastrado!</p>
          <div class="dados-cliente">
            <p><strong>Código:</strong> ${dados.cli_codigo || 'Gerado'}</p>
            <p><strong>Nome:</strong> ${dados.cli_nome}</p>
            <p><strong>Status:</strong> ${ativo ? '✅ Ativo' : '⏸️ Inativo'}</p>
          </div>`;
        break;

      case 'PUT':
        msg = `
          <p style="color:green; font-weight:bold">✅ Atualizado!</p>
          <div class="dados-cliente">
            <p><strong>Código:</strong> ${dados.cli_codigo}</p>
            <p><strong>Nome:</strong> ${dados.cli_nome}</p>
            <p><strong>Status:</strong> ${ativo ? '✅ Ativo' : '⏸️ Inativo'}</p>
          </div>`;
        break;

      case 'DELETE':
        msg = `
          <p style="color:green; font-weight:bold">✅ Removido!</p>
          <div class="dados-cliente">
            <p><strong>Código:</strong> ${dados.cli_codigo || obj.cli_codigo}</p>
          </div>`;
        break;
    }

    document.getElementById(alvo).innerHTML = msg;
    form.reset();
    executar('/cadclient', alvo);

  } catch (err) {
    console.error(err);
    document.getElementById(alvo).innerHTML = `<p style="color:red">❌ ${err.message}</p>`;
  }
}

window.onload = () => {
  executar('/cadclient', 'resultado-findAll');
  
  // Vincula o botão à função correta
  const botaoAtivo = document.querySelector('button[onclick*="ativoinativo"], input[value*="Ativar"], button:contains("Ativar/inativar")');
  if (botaoAtivo) {
    botaoAtivo.type = "button";
    botaoAtivo.onclick = acaoAtivoInativo;
  }
};