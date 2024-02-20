// Refer to readme.txt for info on:
// - Project Structure
// - Hosting

const express = require('express');
const app = express();
const mysql = require('mysql2');
require('dotenv').config();
const moduleAlias = require('module-alias');

moduleAlias.addAlias('@app', __dirname);

const ccompiler_route = require('./routers/compilers/ccompiler.js');
const cppcompiler_route = require('./routers/compilers/cppcompiler.js');
const javacompiler_route = require('./routers/compilers/javacompiler.js');
const pycompiler_route = require('./routers/compilers/pycompiler.js');
const jscompiler_route = require('./routers/compilers/jscompiler.js');
const phpcompiler_route = require('./routers/compilers/phpcompiler.js');

// const conn = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });
// conn.connect((err) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(`Connected to ${process.env.DB_NAME} successfully!`);
//         app.listen(process.env.PORT, () => console.log(`listening on http://localhost:${process.env.PORT}/`));
//     }
// });

// routers
app.use('/ccompiler', ccompiler_route);
app.use('/cppcompiler', cppcompiler_route);
app.use('/javacompiler', javacompiler_route);
app.use('/pycompiler', pycompiler_route);
app.use('/jscompiler', jscompiler_route);
app.use('/phpcompiler', phpcompiler_route);

// app.get('/', async (req, res) => {
//     try {
//         let dbQuery = async () => {
//             return new Promise((resolve, reject) => {
//                 conn.query('select * from problems', (queryErr, data) => {
//                     if (queryErr) {
//                         reject(queryErr);
//                     } else resolve(data);
//                 });
//             });
//         };

//         res.json(await dbQuery());
//     } catch (queryErr) {
//         console.error(queryErr);
//     }
// });
