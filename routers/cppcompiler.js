const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('cppcompiler')
})

router.post('/', (req, res) => {
    res.send('This is the CPP Compiler POST endpoint, your request was recieved\n')
})

module.exports = router