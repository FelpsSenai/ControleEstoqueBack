const express = require('express');
const router = express.Router();

const mercado = require('./dominio/controller/mercado');
const produto = require('./dominio/controller/produto');
const movimentacao = require('./dominio/controller/movimentacao');

router.use(mercado);
router.use(produto);
router.use(movimentacao);

module.exports = router;