// api/controllers/indexController.js

// Definição de variáveis globais do projeto
const nomeProjeto = "Meu Primeiro Projeto Backend - NodeJs - Express - Mysql - DotEnv - EJS - NodeMon";
const nomeAutor = "Andre R. L. Garcia";

// Controller para a página inicial
exports.home = (req, res) => {
  res.render("index/index", {
    title: "Página Inicial",
    nomeProjeto,
    nomeAutor
  });
};

// Controller para a página da Praia
exports.praia = (req, res) => {
  res.render("index/praia", {
    title: "Página da Praia",
    nomeProjeto,
    nomeAutor
  });
};

// Controller para a página da Merenda
exports.merenda = (req, res) => {
  res.render("merenda/merenda", {
    title: "Página de Merenda",
    nomeProjeto,
    nomeAutor
  });
};

// Controller para a página da Merenda / Hamburger
exports.hamburguer = (req, res) => {
  res.render("merenda/hamburguer", {
    title: "Página de hamburguer",
    nomeProjeto,
    nomeAutor
  });
};


// Controller para a página da Merenda / Pizza
exports.pizza = (req, res) => {
  res.render("merenda/pizza", {
    title: "Página da Pizza",
    nomeProjeto,
    nomeAutor
  });
};

// Controller para a página da Merenda / Suco
exports.suco = (req, res) => {
  res.render("merenda/suco", {
    title: "Página de Suco",
    nomeProjeto,
    nomeAutor
  });
};
