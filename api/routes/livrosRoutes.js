const express = require("express");
const router = express.Router();
const livrosController = require("../controllers/livrosController.js");

// Rota para renderizar o EJS (coloque ANTES das rotas dinâmicas)
router.get("/livros.ejs", (req, res) => {
  res.render("livros/livros", {
    title: "Painel de Livros",
    nomeProjeto: "Meu Primeiro Projeto Backend - NodeJs - Express - Mysql - DotEnv - EJS - NodeMon",
    nomeAutor: "Andre R. L. Garcia"
  });
});
// Express procura views/livros/livros.ejs

// Rotas da API
router.get("/", livrosController.getAll);
router.get("/:id", livrosController.getById);
router.post("/", livrosController.create);
router.put("/:id", livrosController.update);
router.delete("/:id", livrosController.remove);
router.patch("/ai/:id", livrosController.ativoinativo);

module.exports = router;
