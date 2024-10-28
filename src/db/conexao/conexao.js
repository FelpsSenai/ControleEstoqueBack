const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
});

function criarBancoDeDados(callback) {
    const criarBanco = "CREATE DATABASE IF NOT EXISTS ATIVIDADE_CONTROLE_ESTOQUE";

    conexao.query(criarBanco, (erro) => {
        if (erro) {
            console.log("Erro ao criar o banco de dados:", erro);
            return callback(erro);
        }
        console.log("Banco de dados criado ou já existe.");
        callback(null);
    });
}

conexao.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar ao banco:", erro);
        return;
    }
    criarBancoDeDados((erro) => {
        if (erro) return;
        conexao.query("USE ATIVIDADE_CONTROLE_ESTOQUE", (erro) => {
            if (erro) {
                console.log("Erro ao usar o banco de dados:", erro);
                return;
            }
            console.log("Banco de dados selecionado.");
        });
    });
});

module.exports = conexao;
