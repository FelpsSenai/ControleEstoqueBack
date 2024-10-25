const server = require('../server.js');
const conexao = require('../../db/conexao/conexao.js');

server.get('/mercado', (req, res) => {
    const consultaSql = 'SELECT ID, NOME, ENDERECO FROM loja';
    conexao.query(consultaSql, (erro, resultado) => {
        if(erro){
            console.log(erro);
            throw erro;
        }
        res.json(resultado)
    })
});

server.post('/mercado', (req, res) => {
    const nomeMercado = req.body.nome;
    const enderecoMercado = req.body.endereco;

    let insertSql = "INSERT INTO loja (NOME, ENDERECO) VALUES ('";
    insertSql = insertSql.concat(nomeMercado, "', '");
    insertSql = insertSql.concat(enderecoMercado, "')");

    conexao.query(insertSql, (erro, resultado) => {
        if(erro) {
            console.log(erro);
            throw erro;
        }
        res.json({mensagem: "Mercado cadastro com sucesso"});
    });
});

server.put('/mercado/:idMercado', (req, res) => {
    const idMercado = req.params.idMercado;
    const nomeMercado = req.body.nome;
    const enderecoMercado = req.body.endereco;

    let updateSql = "UPDATE loja SET nome = '";
    updateSql = updateSql.concat(nomeMercado, "', ENDERECO = '");
    updateSql = updateSql.concat(enderecoMercado, "' WHERE ID = '");
    updateSql = updateSql.concat(idMercado, "'");

    conexao.query(updateSql, (erro, resultado) => {
        if(erro) {
            console.log(erro);
            throw erro;
        }
        res.json({mensagem: "Mercado atualizado com sucesso"});
    });
});

//A fazer o delete
// server.delete('/mercado/:idMercado', (req, res) => {
//     const idMercado = req.params.idMercado;

//     alunos.splice(indiceAluno, 1);

//     res.json({mensagem: 'aluno removido com sucesso'});
// });