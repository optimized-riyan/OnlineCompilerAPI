const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Compiler = require('./compiler')


let COMPILE_COMMAND = 'javac -d ./files ./files/JavaProgram.java'
let RUN_COMMAND = 'java -cp ./files  JavaProgram < ./files/input.txt'
let FILEPATH = './files/JavaProgram.java'
let POSTURL = '/javacompiler/'
let HEADING = 'Java Compiler'


class JavaCompiler extends Compiler {
    constructor() {
        super(COMPILE_COMMAND, RUN_COMMAND)
    }
}
let javacompiler = new JavaCompiler()


router.get('/', (req, res) => {
    res.render('compiler', { heading: HEADING, posturl: POSTURL })
})

router.use(bodyParser.json())

router.post('/', async (req, res) => {
    let code = req.body.code
    let input = req.body.input
    try {
        await javacompiler.storeCode(FILEPATH, code, input)

        let output = await javacompiler.execute()
        res.send(output)
    }
    catch (e) {
        res.send(e)
        console.log(e)
    }
})

module.exports = router