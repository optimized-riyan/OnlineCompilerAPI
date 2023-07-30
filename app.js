// Refer to readme.txt for info on:
// - Project Structure
// - Hosting

const express = require('express')
const app = express()
const path = require('path')

const ccompiler_route = require('./routers/compilers/ccompiler.js')
const cppcompiler_route = require('./routers/compilers/cppcompiler.js')
const javacompiler_route = require('./routers/compilers/javacompiler.js')
const pycompiler_route = require('./routers/compilers/pycompiler.js')
const jscompiler_route = require('./routers/compilers/jscompiler.js')
const phpcompiler_route = require('./routers/compilers/phpcompiler.js')

// constants
PORT = 3000
VIEW_ENGINE = 'ejs'
VIEWS = './views'
STATIC = ['public', 'images', path.join(__dirname, 'build')]

// setters
app.set('view engine', VIEW_ENGINE)
app.set('views', VIEWS)

// middlewares
STATIC.forEach(directory => {
    app.use(express.static(directory))
});

app.use('/ccompiler', ccompiler_route)
app.use('/cppcompiler', cppcompiler_route)
app.use('/javacompiler', javacompiler_route)
app.use('/pycompiler', pycompiler_route)
app.use('/jscompiler', jscompiler_route)
app.use('/phpcompiler', phpcompiler_route)

// root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/Codeboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}/`))