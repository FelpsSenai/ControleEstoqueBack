const express = require('express');
const cors = require('cors');
const server = express();
const migration = require('../db/migration/V1__CREATE_TABLES');
const conexao = require('../db/conexao/conexao.js'); // Importando a conexão

server.use(express.json());
server.use(cors());

conexao.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar ao banco:", erro);
        return;
    }

    // Seleciona o banco de dados e executa as migrações
    conexao.query("USE ATIVIDADE_CONTROLE_ESTOQUE", (erro) => {
        if (erro) {
            console.log("Erro ao usar o banco de dados:", erro);
            return;
        }

        // Executa as migrações
        migration((erro) => {
            if (erro) {
                console.log("Erro ao executar migrações:", erro);
                return;
            }
            console.log("Migrações executadas com sucesso.");
        });
    });
});

server.listen(3000, () => {
    console.log('servidor rodando na porta 3000');
});

module.exports = server;
