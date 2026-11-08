/**
 * Rotas — Sistema de Gestão da Construtora
 * Arquivo: routes/construtora.js
 * Descrição: Definição de todas as rotas do módulo construtora
 */

const express = require("express");
const router = express.Router();

const construtoraController = require("../controllers/construtoraController");

// ==============================================
// Página Inicial
// ==============================================
router.get("/", construtoraController.index);

// ==============================================
// Engenheiros
// ==============================================
router.get("/engenheiros", construtoraController.engenheiro);
router.post("/engenheiros/salvar", construtoraController.salvarEngenheiro);
router.get("/engenheiros/listar", construtoraController.listarEngenheiros);
router.get("/engenheiros/editar/:id", construtoraController.editarEngenheiro);
router.post("/engenheiros/atualizar/:id", construtoraController.atualizarEngenheiro);
router.get("/engenheiros/excluir/:id", construtoraController.excluirEngenheiro);

// ==============================================
// Obras
// ==============================================
router.get("/obras", construtoraController.cadobra);
router.post("/obras/salvar", construtoraController.salvarObra);
router.get("/obras/listar", construtoraController.listarObras);
router.get("/obras/editar/:id", construtoraController.editarObra);
router.post("/obras/atualizar/:id", construtoraController.atualizarObra);
router.get("/obras/excluir/:id", construtoraController.excluirObra);

module.exports = router;
