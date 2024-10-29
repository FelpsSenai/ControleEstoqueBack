const express = require('express');
const router = express.Router();
const conexao = require("../../db/conexao/conexao.js");

router.get('/mercados', (req, res) => {
    const consultaSql = 'SELECT ID, NOME FROM loja';
    conexao.query(consultaSql, (erro, resultado) => {
        if(erro){
            console.log(erro);
            throw erro;
        }
        res.json(resultado)
    })
});

router.get('/mercados/:id', (req, res) => {
    const idMercado = req.params.id;
    const consultaSql = `SELECT * FROM loja WHERE ID = ${idMercado}`;
    conexao.query(consultaSql, (erro, resultado) => {
        if(erro){
            console.log(erro);
            throw erro;
        }
        res.json(resultado)
    })
});

router.post('/mercados', (req, res) => {
    const nomeMercado = req.body.nome;
    const enderecoMercado = req.body.endereco;
    const mercado = {
        nome: nomeMercado,
        endereco: enderecoMercado
    }

    let insertSql = `INSERT INTO loja (NOME, ENDERECO) VALUES ('${nomeMercado}', '${enderecoMercado}')`;

    conexao.query(insertSql, (erro, resultado) => {
        if(erro) {
            console.log(erro);
            throw erro;
        }
        res.json({mercado});
    });
});

router.put('/mercados/:idMercado', (req, res) => {
    const idMercado = req.params.idMercado;
    const nomeMercado = req.body.nome;
    const enderecoMercado = req.body.endereco;

    const mercado = {
        nome: nomeMercado,
        endereco: enderecoMercado
    }

    let updateSql = `UPDATE loja SET NOME = '${nomeMercado}', ENDERECO = '${enderecoMercado}' WHERE ID = '${idMercado}'`;

    conexao.query(updateSql, (erro, resultado) => {
        if(erro) {
            console.log(erro);
            throw erro;
        }
        res.json({mercado});
    });
});

router.delete('/mercados/:idMercado', (req, res) => {
    const idMercado = req.params.idMercado;

    let deleteSql = `DELETE FROM loja WHERE ID = ${idMercado}`;

    conexao.query(deleteSql, (erro, resultado) => {
        if(erro) {
            res.status(500).json({mensagem: erro});
        }
        else{
            res.status(204).json({});
        }
    });
});

module.exports = router;