const express = require('express')
const router = express.Router()
const { exec } = require('child_process')
const bodyParser = require('body-parser')
const Compiler = require('./compiler')


COMPILE_COMMAND = 'g++ -o ./files/cpp_file.cpp ./files/cpp_file'
RUN_COMMAND = './files/cpp_file'
FILEPATH = './files/cpp_file.cpp'

class CPPCompiler extends Compiler {
    constructor() {
        super('cpp', COMPILE_COMMAND, RUN_COMMAND)
    }

    execute() {
        return this.compileAndRun()
    }
}
let cppcompiler = new CPPCompiler()


router.get('/', (req, res) => {
    res.render('cppcompiler')
})

router.use(bodyParser.text())

router.post('/', (req, res) => {
    code = req.body
    cppcompiler.storeCode(FILEPATH, code)

    let result = cppcompiler.execute()
    res.send(result)
})

module.exports = router