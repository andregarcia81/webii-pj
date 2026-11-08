// api/controllers/empresaController.js

const nomeProjeto = "Meu Primeiro Projeto Backend - NodeJs - Express - Mysql - DotEnv - EJS - NodeMon";
const nomeAutor = "Andre R. L. Garcia";

// Página Home da empresa
exports.home = (req, res) => {
  res.render("empresa/home", {
    title: "Home da Empresa",
    nomeProjeto,
    nomeAutor
  });
};

// Página Equipe
exports.equipe = (req, res) => {
  res.render("empresa/equipe", {
    title: "Equipe da Empresa",
    nomeProjeto,
    nomeAutor
  });
};

// Página Missão
exports.missao = (req, res) => {
  res.render("empresa/missao", {
    title: "Missão da Empresa",
    nomeProjeto,
    nomeAutor
  });
};

// Página Sobre
exports.sobre = (req, res) => {
  res.render("empresa/sobre", {
    title: "Sobre a Empresa",
    nomeProjeto,
    nomeAutor
  });
};

// Página Valores
exports.valores = (req, res) => {
  res.render("empresa/valores", {
    title: "Valores da Empresa",
    nomeProjeto,
    nomeAutor
  });
};

// Página Visão
exports.visao = (req, res) => {
  res.render("empresa/visao", {
    title: "Visão da Empresa",
    nomeProjeto,
    nomeAutor
  });
};

// Página Contato
exports.contato = (req, res) => {
  res.render("empresa/contato", {
    title: "Contato da Empresa",
    nomeProjeto,
    nomeAutor
  });
};

