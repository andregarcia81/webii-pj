// api/controllers/cepController.js

// Definição de variáveis globais do projeto
const nomeProjeto = "Meu Primeiro Projeto Backend - NodeJs - Express - Mysql - DotEnv - EJS - NodeMon";
const nomeAutor = "Andre R. L. Garcia";

// Controller para a página Consulta CEP
exports.consultarCep = (req, res) => {
  console.log("Renderizando CEP");    
  res.render("cep/cep", {
    title: "Consulta CEP",
    nomeProjeto,
    nomeAutor
  });
};
