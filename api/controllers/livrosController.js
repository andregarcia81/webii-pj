// Definição de variáveis globais do projeto
const nomeProjeto = "Meu Primeiro Projeto Backend - NodeJs - Express - Mysql - DotEnv - EJS - NodeMon";
const nomeAutor = "Andre R. L. Garcia";

const livrosModels = require("../models/livrosModels");

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  ativoinativo
};

// Buscar todos os livros (simples)
function getAll(req, res) {
  console.log("Controller - Rota Todos os Livros Encontrada!");
  livrosModels.findAll((err, resultado) => {
    if (err) {
      console.error("Erro ao buscar todos os livros:", err);
      res.status(500).json({ error: "Erro ao buscar todos os livros" });
    } else {
      res.json(resultado);
    }
  });
}

// Buscar livro por ID (simples)
function getById(req, res) {
  const codigo = req.params.id;
  console.log("Controller - Rota Localizar Livro Encontrada! Código:", codigo);
  livrosModels.findOne(codigo, (err, resultado) => {
    if (err) {
      console.error("Erro ao buscar livro:", err);
      res.status(500).json({ error: "Erro ao buscar livro" });
    } else {
      res.json(resultado);
    }
  });
}


// Criar novo livro
function create(req, res) {
  const dados = req.body;
  console.log("Controller - Rota Adicionar Novo Livro!", dados);
  livrosModels.create(dados, (err, resultado) => {
    if (err) {
      console.error("Erro ao adicionar livro:", err);
      res.status(500).json({ error: "Erro ao adicionar livro" });
    } else {
      res.json(resultado);
    }
  });
}

// Atualizar livro
function update(req, res) {
  const codigo = req.params.id; // continua pegando da URL
  const dados = req.body;

  // Remove campo 'id' se vier por engano
  delete dados.id;

  console.log("Controller - Rota Atualizar Livro! Código:", codigo);
  livrosModels.update(dados, codigo, (err, resultado) => {
    if (err) {
      console.error("Erro ao atualizar livro:", err);
      res.status(500).json({ error: "Erro ao atualizar livro" });
    } else {
      res.json(resultado);
    }
  });
}

// Remover livro
function remove(req, res) {
  const codigo = req.params.id;
  console.log("Controller - Rota Remover Livro! Código:", codigo);
  livrosModels.remove(codigo, (err, resultado) => {
    if (err) {
      console.error("Erro ao remover livro:", err);
      res.status(500).json({ error: "Erro ao remover livro" });
    } else {
      res.json(resultado);
    }
  });
}

// Ativar/Inativar livro
function ativoinativo(req, res) {
  const codigo = req.params.id;
  console.log("Controller - Rota Ativar/Inativar Livro! Código:", codigo);

  livrosModels.findOne(codigo, (err, resultado) => {
    if (err) {
      console.error("Erro ao buscar livro para ativar/inativar:", err);
      res.status(500).json({ error: "Erro ao buscar livro" });
    } else {
      let statusAtual = resultado[0].liv_ativoinativo;
      let novoStatus = statusAtual === "A" ? "I" : "A";

      console.log(`Livro ${codigo} alterado de ${statusAtual} para ${novoStatus}`);

      livrosModels.ativoinativo(codigo, novoStatus, (err, result) => {
        if (err) {
          console.error("Erro ao atualizar status:", err);
          res.status(500).json({ error: "Erro ao atualizar status" });
        } else {
          res.json(result);
        }
      });
    }
  });
}
