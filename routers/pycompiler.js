const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Interpreter = require('./interpreter')
const { exec } = require('child_process')


let RUN_COMMAND = 'python3 ./files/python_file.py < ./files/input.txt'
let FILEPATH = './files/python_file.py'
let POSTURL = '/pycompiler/'
let HEADING = 'Python Interpreter'


class PyInterpreter extends Interpreter {
    constructor() {
        super(RUN_COMMAND)
    }
}

let pyinterpreter = new PyInterpreter()


router.get('/', (req, res) => {
    res.render('compiler', { heading: HEADING, posturl: POSTURL })
})

router.use(bodyParser.json())

router.post('/', async (req, res) => {
    let code = req.body.code
    let input = req.body.input
    try {
        await pyinterpreter.storeCode(FILEPATH, code, input)

        let output = await pyinterpreter.execute()
        res.send(output)
    }
    catch (e) {
        res.send(e)
        console.log(e)
    }
})

module.exports = router