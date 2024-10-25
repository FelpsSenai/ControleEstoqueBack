const express = require('express');
const cors = require('cors');
const server = express();
const migration = require('../db/migration/V1__CREATE_TABLES');

server.use(express.json());
server.use(cors());

server.listen(3000, () => {
    console.log('servidor rodando na porta 3000');
});

module.exports = server;