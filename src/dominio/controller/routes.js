const express = require('express');
const router = express.Router();

const mercado = require('./mercado.js');
const produto = require('./produto.js');

router.use(mercado);
router.use(produto);

module.exports = router;