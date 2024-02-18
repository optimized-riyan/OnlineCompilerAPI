const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Interpreter = require('./interpreter')


let RUN_COMMAND = (codeFile, inputFile) => {
    return ('node ./files/' + codeFile + ' < ./files/' + inputFile)
}


class JSInterpreter extends Interpreter {
    constructor() {
        super()
    }
}
let jsinterpreter = new JSInterpreter()

router.get('/', (req, res) => {
    res.render('compiler')
})

router.use(bodyParser.json())

router.post('/', async (req, res) => {
    let code = req.body.code
    let input = req.body.input
    try {
        let files = await jsinterpreter.storeCode('js', code, input)
        
        let output = await jsinterpreter.execute(RUN_COMMAND(files.codeFile, files.inputFile))
        res.send(output)

        jsinterpreter.removeFile(files.codeFile)
        jsinterpreter.removeFile(files.inputFile)
    }
    catch (e) {
        res.send(e)
        console.log(e)
    }
})

module.exports = router