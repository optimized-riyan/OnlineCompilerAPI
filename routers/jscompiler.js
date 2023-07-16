const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Interpreter = require('./interpreter')


let RUN_COMMAND = 'node ./files/js_file.js'
let FILEPATH = './files/js_file.js'
let POSTURL = '/jscompiler/'
let HEADING = 'JS Interpreter'


class JSInterpreter extends Interpreter {
    constructor() {
        super(RUN_COMMAND)
    }
}
let jsinterpreter = new JSInterpreter()


router.get('/', (req, res) => {
    res.render('compiler', { heading: HEADING, posturl: POSTURL })
})

router.use(bodyParser.text())

router.post('/', async (req, res) => {
    let code = req.body
    try {
        await jsinterpreter.storeCode(FILEPATH, code)

        let output = await jsinterpreter.execute()
        console.log(output)
        res.send(output)
    }
    catch (e) {
        res.send(e)
        console.log(e)
    }
})

module.exports = router