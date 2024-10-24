const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "ATIVIDADE_CONTROLE_ESTOQUE"
});

conexao.connect((erro) => {
    if (erro != null) {
        console.log("Erro ao conectar ao banco");
        return;
    }
});

module.exports = conexao;