// api/routes/empresaRoutes.js
const express = require("express");
const router = express.Router();
const empresaController = require("../controllers/empresaController");

// Rotas da empresa
router.get("/", empresaController.home);
router.get("/equipe", empresaController.equipe);
router.get("/missao", empresaController.missao);
router.get("/sobre", empresaController.sobre);
router.get("/valores", empresaController.valores);
router.get("/visao", empresaController.visao);
router.get("/contato", empresaController.contato);

module.exports = router;
