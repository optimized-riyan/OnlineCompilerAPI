const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Compiler = require('./compiler')


let COMPILE_COMMAND = 'javac -d ./files ./files/JavaProgram.java'
let RUN_COMMAND = 'java -cp ./files  JavaProgram'
let FILEPATH = './files/JavaProgram.java'
let POSTURL = '/javacompiler/'
let HEADING = 'Java Compiler'


class CPPCompiler extends Compiler {
    constructor() {
        super(COMPILE_COMMAND, RUN_COMMAND)
    }
}
let cppcompiler = new CPPCompiler()


router.get('/', (req, res) => {
    res.render('compiler', { heading: HEADING, posturl: POSTURL })
})

router.use(bodyParser.text())

router.post('/', async (req, res) => {
    let code = req.body
    try {
        await cppcompiler.storeCode(FILEPATH, code)

        let output = await cppcompiler.execute()
        res.send(output)
    }
    catch (e) {
        res.send(e)
        console.log(e)
    }
})

module.exports = router