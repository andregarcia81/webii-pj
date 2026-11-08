const express = require('express');
const router = express.Router();
const cadclientController = require('../controllers/cadclientController');

// 🔹 Rota para renderizar o EJS — EXATAMENTE como você tinha
router.get('/cadclient.ejs', (req, res) => {
  res.render('cadclient/cadclient', {
    title: 'Painel de Cadastro / Manutenção de Clientes',
    nomeProjeto: 'Meu Primeiro Projeto Backend - NodeJs - Express - Mysql - DotEnv - EJS - NodeMon',
    nomeAutor: 'Andre R. L. Garcia'
  });
});

// 🔹 Rotas da API
router.get('/', cadclientController.findAll);
router.get('/:id', cadclientController.findOne);
router.post('/', cadclientController.create);
router.put('/:id', cadclientController.update);
router.delete('/:id', cadclientController.remove);
// ✅ Mantive o caminho /ai/:id igual ao seu!
router.patch('/ai/:id', cadclientController.ativoinativo);

module.exports = router;