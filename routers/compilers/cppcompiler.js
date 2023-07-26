const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Compiler = require('./compiler')
const path = require('path')


let COMPILE_COMMAND = 'g++ ./files/cpp_file.cpp -o ./files/cpp_file'
let RUN_COMMAND = './files/cpp_file < ./files/input.txt'
let FILEPATH = './files/cpp_file.cpp'
let POSTURL = '/cppcompiler/'
let HEADING = 'CPP Compiler'


class CPPCompiler extends Compiler {
    constructor() {
        super(COMPILE_COMMAND, RUN_COMMAND)
    }
}
let cppcompiler = new CPPCompiler()


router.get('/', (req, res) => {
    res.render('compiler', { heading: HEADING, posturl: POSTURL })
})

router.use(bodyParser.json())

router.post('/', async (req, res) => {
    let code = req.body.code
    let input = req.body.input
    try {
        await cppcompiler.storeCode(FILEPATH, code, input)

        let output = await cppcompiler.execute()
        res.send(output)
    }
    catch (e) {
        res.send(e)
        console.log(e)
    }
})

module.exports = router