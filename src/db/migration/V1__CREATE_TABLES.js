const conexao = require ("../conexao/conexao.js");

const criarTabelaLoja = "CREATE TABLE IF NOT EXISTS LOJA("
                            + "`ID` INT PRIMARY KEY AUTO_INCREMENT,"
                            + "`NOME` VARCHAR(50),"
                            + "`ENDERECO` VARCHAR(100)"
                        +")";

conexao.query(criarTabelaLoja, (erro, resultado) => {
    if (erro) {
        throw new Error(erro);
    }
});

const criarTabelaProduto = "CREATE TABLE IF NOT EXISTS PRODUTO("
                                + "`ID` INT PRIMARY KEY AUTO_INCREMENT,"
                                + "`NOME` VARCHAR(50),"
                                + "`DESCRICAO` VARCHAR(200),"
                                + "`PRECO` FLOAT,"
                                + "`QUANTIDADE` INT,"
                                + "`LOJA_ID` INT REFERENCES LOJA(ID)"
                            +")";

conexao.query(criarTabelaProduto, (erro, resultado) => {
    if (erro) {
        throw new Error(erro);
    }
});

const criarTabelaMovimentacao = "CREATE TABLE IF NOT EXISTS MOVIMENTACAO("
                                    + "`ID` INT PRIMARY KEY AUTO_INCREMENT,"
                                    + "`TIPO` ENUM('ENTRADA', 'SAIDA'),"
                                    + "`QUANTIDADE` INT,"
                                    + "`DATA` DATE,"
                                    + "`PRODUTO_ID` INT REFERENCES PRODUTO(ID)"
                                +")";

conexao.query(criarTabelaMovimentacao, (erro, resultado) => {
    if (erro) {
        throw new Error(erro);
    }
});