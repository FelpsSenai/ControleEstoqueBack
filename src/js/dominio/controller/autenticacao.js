const express = require('express');
const router = express.Router();
const conexao = require('../../../resources/conexao');
const { verifyPassword } = require('../../../resources/PasswordCrypto');
const JWTService = require('../../../resources/JWTService')

router.post('/login', (req, res) => {
    const usuario = req.body;
    const emailUsuario = usuario.email;
    const senhaUsuario = usuario.senha;

    const selectSql = `SELECT 1 FROM USUARIO WHERE EMAIL = '${emailUsuario}'`;

    conexao.query(selectSql, (erro, resultado) => {
        if (erro) {
            res.status(500).json({});
        } else if (resultado.length == 0) {
            res.status(404).json({
                erro: "Credenciais inválidas."
            });
        } else {
            const selectSql = `SELECT SENHA FROM USUARIO WHERE EMAIL = '${emailUsuario}'`;

            conexao.query(selectSql, async (erro, resultado) => {
                if (erro) {
                    res.status(500).json({});
                } else {
                    const passwordMatch = await verifyPassword(senhaUsuario, resultado[0].SENHA)

                    if (passwordMatch) {
                        const token = JWTService.sign('')

                        return res.status(200).json({ accessToken: token })
                    } else {
                        return res.status(401).json({
                            erro: "Credenciais inválidas."
                        })
                    }
                }
            });
        }
    });
});

module.exports = router;
