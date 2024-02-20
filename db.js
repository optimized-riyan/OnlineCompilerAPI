const mysql = require('mysql');
const moduleAlias = require('module-alias');

moduleAlias.addAlias('@db', __dirname);

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

conn.connect(function(err) {
    if (err) throw err;
    connsole.log("Connected!");
});

module.exports = conn