const express = require('express')
const app = express()

const cppcompiler_route = require('./routers/cppcompiler.js')
const javacompiler_route = require('./routers/javacompiler.js')
const pycompiler_route = require('./routers/pycompiler.js')

// constants
VIEW_ENGINE = 'ejs'
VIEWS = './views'
STATIC = ['public', 'images']

// setters
app.set('view engine', VIEW_ENGINE)
app.set('views', VIEWS)

// middlewares
STATIC.forEach(directory => {
    app.use(express.static(directory))
});

app.use('/cppcompiler', cppcompiler_route)
app.use('/javacompiler', javacompiler_route)
app.use('/pycompiler', pycompiler_route)

// root route
app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.listen(3000, () => console.log('listening...'))