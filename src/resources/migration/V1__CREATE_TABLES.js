const conexao = require("../conexao");

function executeMigration(callback) {
    const criarTabelaLoja = `
        CREATE TABLE IF NOT EXISTS LOJA (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            NOME VARCHAR(50),
            ENDERECO VARCHAR(100)
        )`;

    conexao.query(criarTabelaLoja, (erro, resultado) => {
        if (erro) {
            return callback(erro);
        }

        const criarTabelaProduto = `
            CREATE TABLE IF NOT EXISTS PRODUTO (
                ID INT PRIMARY KEY AUTO_INCREMENT,
                NOME VARCHAR(50),
                DESCRICAO VARCHAR(200),
                PRECO FLOAT,
                QUANTIDADE INT,
                LOJA_ID INT,
                FOREIGN KEY (LOJA_ID) REFERENCES LOJA(ID)
            )`;

        conexao.query(criarTabelaProduto, (erro, resultado) => {
            if (erro) {
                return callback(erro);
            }

            const criarTabelaMovimentacao = `
                CREATE TABLE IF NOT EXISTS MOVIMENTACAO (
                    ID INT PRIMARY KEY AUTO_INCREMENT,
                    TIPO ENUM('ENTRADA', 'SAIDA'),
                    QUANTIDADE INT,
                    DATA DATE,
                    PRODUTO_ID INT,
                    FOREIGN KEY (PRODUTO_ID) REFERENCES PRODUTO(ID)
                )`;

            conexao.query(criarTabelaMovimentacao, (erro, resultado) => {
                if (erro) {
                    return callback(erro);
                }
                callback(null);
            });
        });
    });
}

module.exports = executeMigration;
