const express = require('express');
const router = express.Router();

const mercado = require('./controller/mercado.js');
const produto = require('./controller/produto.js');
const movimentacao = require('./controller/movimentacao.js');

router.use(mercado);
router.use(produto);
router.use(movimentacao);

module.exports = router;