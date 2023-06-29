const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Compiler = require('./compiler')


let COMPILE_COMMAND = 'g++ ./files/cpp_file.cpp -o ./files/cpp_file'
let RUN_COMMAND = './files/cpp_file'
let FILEPATH = './files/cpp_file.cpp'


class CPPCompiler extends Compiler {
    constructor() {
        super(COMPILE_COMMAND, RUN_COMMAND)
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

router.post('/', async (req, res) => {
    let code = req.body
    try {
        await cppcompiler.storeCode(FILEPATH, code)

        let output = await cppcompiler.execute()
        res.send(output)
    }
    catch (e) {
        // res.send(e)
        res.send(e)
        console.log(e)
    }
})

module.exports = router