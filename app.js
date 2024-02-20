// Refer to readme.txt for info on:
// - Project Structure
// - Hosting

const express = require('express');
const app = express();
require('dotenv').config();
const conn = require('./db.js');

conn.connect((err) => {
    if (err) throw err;
    else {
        console.log(`Connected to ${process.env.DB_NAME}!`);
        app.listen(process.env.PORT, () =>
            console.log(`Listening on http://localhost:${process.env.PORT}`)
        );
    }
});

const ccompiler_route = require('./routers/compilers/ccompiler.js');
const cppcompiler_route = require('./routers/compilers/cppcompiler.js');
const javacompiler_route = require('./routers/compilers/javacompiler.js');
const pycompiler_route = require('./routers/compilers/pycompiler.js');
const jscompiler_route = require('./routers/compilers/jscompiler.js');
const phpcompiler_route = require('./routers/compilers/phpcompiler.js');

// routers
app.use('/ccompiler', ccompiler_route);
app.use('/cppcompiler', cppcompiler_route);
app.use('/javacompiler', javacompiler_route);
app.use('/pycompiler', pycompiler_route);
app.use('/jscompiler', jscompiler_route);
app.use('/phpcompiler', phpcompiler_route);
