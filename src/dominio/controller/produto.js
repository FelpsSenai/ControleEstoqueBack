const server = require ("../server.js");
const conexao = require ("../../db/conexao/conexao.js");

server.post("/mercados/:id_mercado/produtos", (req, res) => {
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
            res.status(400).json({ mensagem: "Erro ao cadastrar produto" });
        } else {
            res.status(204).json({ mensagem: "Produto cadastrado com sucesso", resultado: produto });
        }
    });
});