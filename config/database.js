const mysql = require('mysql2/promise');

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kitclub',
};

const db = mysql.createPool(config);

module.exports = db;
//require tem que ser igual o export, no caso aqui pool

//config = configuração da conexao com o banco de dados