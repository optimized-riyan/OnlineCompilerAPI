const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Interpreter = require('./interpreter')


let RUN_COMMAND = 'python3 ./files/python_file.py'
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

router.use(bodyParser.text())

router.post('/', async (req, res) => {
    let code = req.body
    try {
        await pyinterpreter.storeCode(FILEPATH, code)

        let output = await pyinterpreter.execute()
        res.send(output)
    }
    catch (e) {
        res.send(e)
        console.log(e)
    }
})

module.exports = router