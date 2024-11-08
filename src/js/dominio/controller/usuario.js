const express = require ('express');
const router = express.Router();
const conexao = require('../../../resources/conexao');
const passwordCrypto = require('../../../resources/PasswordCrypto.js')

router.post('/usuarios', async (req, res) => {
    const usuario = req.body;
    const nomeUsuario = usuario.nome;
    const emailUsuario = usuario.email;
    const senhaUsuario = await passwordCrypto.hashPassword(usuario.senha)

    const insertSql = `INSERT INTO USUARIO (NOME, EMAIL, SENHA) VALUES (
        '${nomeUsuario}',
        '${emailUsuario}',
        '${senhaUsuario}'
    )`

    conexao.query(insertSql, (erro, resultado) => {
        if (erro) {
            res.status(500).json({});
        }
        res.status(201).json({'nome': nomeUsuario, 'email': emailUsuario});
    });
});

router.get('/usuarios', (req, res) => {
    const selectSql = `SELECT ID, NOME FROM USUARIO`;
    
    conexao.query(selectSql, (erro, resultado) => {
        if (erro) {
            res.status(500).json({});
        }
        res.json({resultado});
    });
});

router.get('/usuarios/:id', (req, res) => {
    const id = req.params.id;

    const selectSql = `SELECT NOME, EMAIL FROM USUARIO WHERE ID = ${id}`;

    conexao.query(selectSql, (erro, resultado) => {
        if (erro) {
            res.status(500).json({});
        }
        res.json({resultado});
    });
});

router.put('/usuarios/:id', (req, res) => {
    const id = req.params.id;

    const usuario = req.body;
    const nomeUsuario = usuario.nome;
    const emailUsuario = usuario.email;

    const updateSql = `UPDATE USUARIO SET NOME = '${nomeUsuario}', EMAIL = '${emailUsuario}' WHERE ID = ${id}`;

    conexao.query(updateSql, (erro, resultado) => {
        if (erro) {
            res.status(500).json({});
        }
        res.json({'nome': nomeUsuario, 'email': emailUsuario});
    });
});

router.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;

    const deleteSql = `DELETE FROM USUARIO WHERE ID = ${id}`;

    conexao.query(deleteSql, (erro, resultado) => {
        if (erro) {
            res.status(500).json({});
        }
        res.status(204).json({});
    });
});

module.exports = router;
