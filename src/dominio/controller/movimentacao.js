const conexao = require("../../db/conexao/conexao.js");
const express = require('express');
const router = express.Router();


router.post("/mercados/:id_mercado/produtos/:id_produto/movimentacoes", (req, res) => {
    const idProduto = req.params.id_produto;
    const jsonMovimentacao = req.body;

    const movimentacao = {
        tipo: jsonMovimentacao.tipo,
        quantidade: jsonMovimentacao.quantidade,
        data: jsonMovimentacao.data_movimentacao
    }

    const sqlInsert = "INSERT INTO MOVIMENTACOES (TIPO, QUANTIDADE, DATA, PRODUTO_ID) "
                    + "VALUES "
                    + "('" + movimentacao.tipo + "', " + movimentacao.quantidade + ", '" + movimentacao.data + "', " + idProduto + ")";

    conexao.query(sqlInsert, (erro, resultado) => {
        if (erro) {
            json.status(400).json({ erro });
        } else {
            json.status(201).json({ movimentacao });
        }
    });
});

router.get("/mercados/:id_mercado/produtos/:id_produto/movimentacoes", (req, res) => {
    const idProduto = req.params.id_produto;

    const sqlSelect = "SELECT TIPO, QUANTIDADE, DATA "
                    + "FROM MOVIMENTACAO "
                    + "WHERE PRODUTO_ID = " + idProduto;

    conexao.query(sqlSelect, (erro, resultado) => {
        if (erro) {
            res.status(500).json({ mensagem: "Erro ao buscar as movimentações" });
        } else {
            res.json({ resultado });
        }
    });
});

module.exports = router;