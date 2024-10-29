
const router = require ('./routes.js');

const express = require('express');
const cors = require('cors');
const server = express();
const migration = require('../db/migration/V1__CREATE_TABLES');
const conexao = require('../db/conexao/conexao.js');

server.use(express.json());
server.use(cors());
server.use(router);

conexao.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar ao banco:", erro);
        return;
    }

    conexao.query("USE ATIVIDADE_CONTROLE_ESTOQUE", (erro) => {
        if (erro) {
            console.log("Erro ao usar o banco de dados:", erro);
            return;
        }

        migration((erro) => {
            if (erro) {
                console.log("Erro ao executar migrações:", erro);
                return;
            }
        });
    });
});

server.listen(3000, () => {
    console.log('servidor rodando na porta 3000');
});

module.exports = server;
