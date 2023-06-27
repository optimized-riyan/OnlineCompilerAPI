const express = require('express')
const app = express()

VIEW_ENGINE = 'ejs'
VIEWS = './views'
STATIC = ['public', 'images']

app.set('view engine', VIEW_ENGINE)
app.set('views', VIEWS)

STATIC.forEach(directory => {
    app.use(express.static(directory))
});

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.listen(3000, () => {
    console.log('listening...')
})