const model = require("../models/cadclientModel");

function findAll(req, res) {
  model.findAll((err, resultado) => {
    if (err) return res.status(500).json({ erro: true, mensagem: "Erro ao listar" });
    res.json(resultado);
  });
}

function findOne(req, res) {
  model.findOne(req.params.id, (err, resultado) => {
    if (err) return res.status(400).json({ erro: true, mensagem: err.message });
    if (!resultado) return res.status(404).json({ mensagem: "Não encontrado" });
    res.json(resultado);
  });
}

function create(req, res) {
  model.create(req.body, (err, resultado) => {
    if (err) return res.status(500).json({ erro: true, mensagem: "Erro ao cadastrar" });
    res.json(resultado);
  });
}

function update(req, res) {
  model.update(req.body, req.params.id, (err, resultado) => {
    if (err) return res.status(500).json({ erro: true, mensagem: "Erro ao atualizar" });
    res.json(resultado);
  });
}

function remove(req, res) {
  model.remove(req.params.id, (err) => {
    if (err) return res.status(500).json({ erro: true, mensagem: "Erro ao remover" });
    res.json({ mensagem: "Removido", cli_codigo: req.params.id });
  });
}

function ativoinativo(req, res) {
  console.log("📥 Rota /ai/:id — recebido:", req.params.id);
  
  model.ativoinativo(req.params.id, (err, dados) => {
    if (err) {
      console.error("❌ Erro:", err);
      return res.status(400).json({ erro: true, mensagem: err.message });
    }
    res.json(dados);
  });
}

module.exports = { findAll, findOne, create, update, remove, ativoinativo };