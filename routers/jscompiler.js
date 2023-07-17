const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Interpreter = require('./interpreter')
const { exec } = require('child_process')


let RUN_COMMAND = 'node ./files/js_file.js < ./files/input.txt'
let FILEPATH = './files/js_file.js'
let POSTURL = '/jscompiler/'
let HEADING = 'JS Interpreter'


class JSInterpreter extends Interpreter {
    constructor() {
        super(RUN_COMMAND)
    }

    execute() {
        return new Promise((resolve, reject) => {
            
            const process = exec(this.runCommand, (error, stdout, stderr) => {
                console.log(error, stdout, stderr)
                if (error)
                    resolve(error.message)
                else
                    resolve(stdout)
            })

            this.timeoutCheck(process, reject)

        })
    }
}

let jsinterpreter = new JSInterpreter()


router.get('/', (req, res) => {
    res.render('compiler', { heading: HEADING, posturl: POSTURL })
})

router.use(bodyParser.json())

router.post('/', async (req, res) => {
    let code = req.body.code
    let input = req.body.input
    try {
        await jsinterpreter.storeCode(FILEPATH, code, input)

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