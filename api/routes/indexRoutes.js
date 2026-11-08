const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

router.get("/", indexController.home);
router.get("/praia", indexController.praia);
router.get("/merenda", indexController.merenda);
router.get("/merenda/hamburguer", indexController.hamburguer);
router.get("/merenda/pizza", indexController.pizza);
router.get("/merenda/suco", indexController.suco);

module.exports = router;
