const express = require('express');
const router = express.Router();
const conexao = require("../../../resources/conexao");

router.post("/mercados/:id_mercado/produtos", (req, res) => {
    const idMercado = req.params.id_mercado;
    const jsonProduto = req.body;

    const produto = {
        nome: jsonProduto.nome,
        descricao: jsonProduto.descricao,
        preco: jsonProduto.preco,
        quantidade: jsonProduto.quantidade,
        idMercado: idMercado
    }

    const sqlInsert = "INSERT INTO PRODUTO"
                    + "(NOME, DESCRICAO, PRECO, QUANTIDADE, LOJA_ID)"
                    + "VALUES"
                    + "('" + produto.nome + "', '" + produto.descricao + "', " + produto.preco + ", " + produto.quantidade + ", " + produto.idMercado + ")";

    conexao.query(sqlInsert, (erro, resultado) => {
        if (erro) {
            res.status(400).json({ mensagem: erro });
        } else {
            res.status(201).json({ mensagem: "Produto cadastrado com sucesso", resultado: produto });
        }
    });
});

router.get("/mercados/:id_mercado/produtos", (req, res) => {
    const idMercado = req.params.id_mercado;

    const sqlSelect = "SELECT ID, NOME "
                    + "FROM PRODUTO "
                    + "WHERE LOJA_ID = " + idMercado;
    
    const sqlCount = "SELECT COUNT(1) AS CONTAGEM "
                    + "FROM PRODUTO "
                    + "WHERE LOJA_ID = " + idMercado;

    let quantidadeProdutos;

    conexao.query(sqlCount, (erro, resultado) => {
        quantidadeProdutos = resultado[0]["CONTAGEM"];
    });

    conexao.query(sqlSelect, (erro, resultado) => {
        if (erro) {
            res.status(500).json({ mensagem: "Erro ao listar os produtos" });
        } else {
            res.json({ quantidadeProdutos, resultado });
        }
    });
});

router.get("/mercados/:id_mercado/produtos/:id_produto", (req, res) => {
    const idProduto = req.params.id_produto;

    const sqlSelect = "SELECT NOME, DESCRICAO, PRECO, QUANTIDADE "
                    + "FROM PRODUTO "
                    + "WHERE ID = " + idProduto;

    conexao.query(sqlSelect, (erro, resultado) => {
        if (erro) {
            res.status(500).json({ mensagem: "Erro ao listar os produtos" });
        } else {
            res.json( resultado );
        }
    });
});

router.put("/mercados/:id_mercado/produtos/:id_produto", (req, res) => {
    const idProduto = req.params.id_produto;

    const jsonProduto = req.body;

    const produto = {
        nome: jsonProduto.nome,
        descricao: jsonProduto.descricao,
        preco: jsonProduto.preco,
        quantidade: jsonProduto.quantidade
    }

    const sqlUpdate = "UPDATE PRODUTO "
                    + "SET NOME = '" + produto.nome + "', "
                    + "DESCRICAO = '" + produto.descricao + "', "
                    + "PRECO = " + produto.preco + ", "
                    + "QUANTIDADE = " + produto.quantidade + " "
                    + "WHERE ID = " + idProduto;

    conexao.query(sqlUpdate, (erro, resultado) => {
        if (erro) {
            res.status(400).json({ mensagem: erro });
        } else {
            res.json({ produto });
        }
    });
});

router.delete("/mercados/:id_mercado/produtos/:id_produto", (req, res) => {
    const idProduto = req.params.id_produto;

    const sqlDelete = "DELETE FROM PRODUTO "
                    + "WHERE ID = " + idProduto;

    conexao.query(sqlDelete, (erro, resultado) => {
        if (erro) {
            res.status(500).json({ mensagem: erro });
        } else {
            res.status(204).json({});
        }
    });
});

module.exports = router;