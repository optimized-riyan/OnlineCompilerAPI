const express = require('express')
const router = express.Router()
const { exec } = require('child_process')
const bodyParser = require('body-parser')
const Compiler = require('./compiler')


RUN_COMMAND = './files/cpp_file'
COMPILE_COMMAND = 'g++ -o ./files/cpp_file.cpp ./files/cpp_file'
FILEPATH = './files/cpp_file.cpp'

class CPPCompiler extends Compiler {
    constructor() {
        super('cpp', RUN_COMMAND, COMPILE_COMMAND)
    }

    run() {
        return this.compileAndRun()
    }
}
cppcompiler = new CPPCompiler()


router.get('/', (req, res) => {
    res.render('cppcompiler')
})

router.use(bodyParser.text())

router.post('/', (req, res) => {
    code = req.body
    
})

module.exports = router