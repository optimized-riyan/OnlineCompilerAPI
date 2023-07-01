const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Interpreter = require('./interpreter')


let RUN_COMMAND = 'php ./files/php_file.php'
let FILEPATH = './files/php_file.php'
let POSTURL = '/phpcompiler/'
let HEADING = 'PHP Interpreter'


class PHPInterpreter extends Interpreter {
    constructor() {
        super(RUN_COMMAND)
    }
}
let phpinterpreter = new PHPInterpreter()


router.get('/', (req, res) => {
    res.render('compiler', { heading: HEADING, posturl: POSTURL })
})

router.use(bodyParser.text())

router.post('/', async (req, res) => {
    let code = req.body
    try {
        await phpinterpreter.storeCode(FILEPATH, code)

        let output = await phpinterpreter.execute()
        res.send(output)
    }
    catch (e) {
        res.send(e)
        console.log(e)
    }
})

module.exports = router