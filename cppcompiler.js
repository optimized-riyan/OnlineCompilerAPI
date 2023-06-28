const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('CPP Compiler GET endpoint\n')
})

router.post('/', (req, res) => {
    res.send('CPP Compiler POST endpoint\n')
})

module.exports = router