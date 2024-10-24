const conexao = require ("../conexao/conexao.js");

const criarTabelaLoja = "CREATE TABLE IF NOT EXISTS LOJA("
                            + "ID INT PRIMARY KEY AUTO_INCREMENT,"
                            + "NOME VARCHAR(50),"
                            + "ENDERECO VARCHAR(100)"
                        +")";

conexao.query(criarTabelaAluno, (erro, resultado) => {
    if (erro) {
        throw new Error(erro);
    }
});

const criarTabelaProduto = "CREATE TABLE IF NOT EXISTS PRODUTO("
                                + "ID INT PRIMARY KEY AUTO_INCREMENT,"
                                + "NOME VARCHAR(50),"
                                + "DESCRICAO VARCHAR(200),"
                                + "PRECO FLOAT,"
                                + "QUANTIDADE INT,"
                                + "LOJA_ID INT REFERENCES LOJA(ID)"
                            +")";

const criarTabelaMovimentacao = "CREATE TABLE IF NOT EXISTS PRODUTO("
                            + "ID INT PRIMARY KEY AUTO_INCREMENT,"
                            + "NOME VARCHAR(50),"
                            + "DESCRICAO VARCHAR(200),"
                            + "PRECO FLOAT,"
                            + "QUANTIDADE INT,"
                            + "LOJA_ID INT REFERENCES LOJA(ID)"
                        +")";